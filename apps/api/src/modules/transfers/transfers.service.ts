import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService, private readonly history: HistoryService) {}

  async create(dto: CreateTransferDto, actorId: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id: dto.toolId } });
    if (!tool) {
      throw new BadRequestException('tool_not_found');
    }
    return this.prisma.$transaction(async (tx) => {
      const transfer = await tx.transfer.create({
        data: {
          toolId: dto.toolId,
          fromWarehouse: tool.warehouseId,
          toWarehouse: dto.toWarehouse,
          status: 'IN_TRANSIT',
          requestedBy: actorId,
        },
      });
      await tx.tool.update({ where: { id: dto.toolId }, data: { status: 'IN_TRANSIT' } });
      await this.history.record(tx, {
        toolId: dto.toolId,
        type: 'TRANSFER_REQUESTED',
        payload: { actorId, toWarehouse: dto.toWarehouse },
      });
      return transfer;
    });
  }
}
