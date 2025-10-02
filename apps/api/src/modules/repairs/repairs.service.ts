import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class RepairsService {
  constructor(private readonly prisma: PrismaService, private readonly history: HistoryService) {}

  async create(dto: CreateRepairDto, actorId: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id: dto.toolId } });
    if (!tool) {
      throw new BadRequestException('tool_not_found');
    }
    return this.prisma.$transaction(async (tx) => {
      const repair = await tx.repair.create({
        data: {
          toolId: dto.toolId,
          description: dto.description,
          resolution: dto.resolution,
          resolvedAt: dto.resolution ? new Date() : null,
        },
      });
      await tx.tool.update({ where: { id: dto.toolId }, data: { status: dto.resolution ? 'SERVICEABLE' : 'QUARANTINED' } });
      await this.history.record(tx, {
        toolId: dto.toolId,
        type: 'REPAIR_EVENT',
        payload: { actorId, description: dto.description, resolution: dto.resolution },
      });
      return repair;
    });
  }
}
