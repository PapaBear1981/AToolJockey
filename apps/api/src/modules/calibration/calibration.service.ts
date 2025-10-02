import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReceiveCalibrationDto } from './dto/receive-calibration.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CalibrationService {
  constructor(private readonly prisma: PrismaService, private readonly history: HistoryService) {}

  async receive(dto: ReceiveCalibrationDto, actorId: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id: dto.toolId } });
    if (!tool) {
      throw new BadRequestException('tool_not_found');
    }

    return this.prisma.$transaction(async (tx) => {
      const calibration = await tx.calibration.upsert({
        where: { toolId: dto.toolId },
        update: {
          receivedAt: new Date(),
          dueAt: new Date(dto.dueAt),
          certificateUrl: dto.certificateUrl,
        },
        create: {
          toolId: dto.toolId,
          dueAt: new Date(dto.dueAt),
          receivedAt: new Date(),
          certificateUrl: dto.certificateUrl,
        },
      });
      await tx.tool.update({
        where: { id: dto.toolId },
        data: { status: 'SERVICEABLE' },
      });
      await this.history.record(tx, {
        toolId: dto.toolId,
        type: 'CALIBRATION_RECEIVED',
        payload: {
          actorId,
          dueAt: dto.dueAt,
          certificateUrl: dto.certificateUrl,
        },
      });
      return calibration;
    });
  }
}
