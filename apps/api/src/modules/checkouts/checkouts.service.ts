import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CheckoutsService {
  constructor(private readonly prisma: PrismaService, private readonly history: HistoryService) {}

  async create(dto: CreateCheckoutDto & { actorId: string; capability: string[] }) {
    const tool = await this.prisma.tool.findUnique({
      where: { id: dto.toolId },
      include: { calibration: true, quarantine: true },
    });
    if (!tool) {
      throw new BadRequestException('tool_not_found');
    }

    const blockers: string[] = [];
    if (tool.status !== 'SERVICEABLE') {
      blockers.push(`status:${tool.status}`);
    }
    if (tool.calibration && tool.calibration.dueAt < new Date()) {
      blockers.push('calibration:expired');
    }
    if (tool.quarantine && tool.quarantine.releasedAt === null) {
      blockers.push('quarantine:active');
    }

    const overrideAllowed = dto.capability.includes('checkout.override');
    if (blockers.length && !(overrideAllowed && dto.overrideReason)) {
      throw new BadRequestException({ code: 'checkout_blocked', blockers });
    }

    const checkout = await this.prisma.$transaction(async (tx) => {
      const record = await tx.checkout.create({
        data: {
          toolId: dto.toolId,
          userId: dto.userId,
          status: 'ISSUED',
          overrideReason: blockers.length ? dto.overrideReason : undefined,
        },
      });
      await tx.tool.update({
        where: { id: dto.toolId },
        data: { status: 'CHECKED_OUT' },
      });
      await this.history.record(tx, {
        toolId: dto.toolId,
        type: blockers.length ? 'CHECKOUT_OVERRIDE' : 'CHECKOUT',
        payload: {
          actorId: dto.actorId,
          blockers,
          overrideReason: dto.overrideReason,
        },
      });
      return record;
    });

    return checkout;
  }
}
