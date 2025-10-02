import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { createHash } from 'crypto';

interface RecordEventInput {
  toolId: string;
  type: string;
  payload: Record<string, unknown>;
}

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async record(client: PrismaClient | Prisma.TransactionClient, event: RecordEventInput) {
    const previous = await client.historyEvent.findFirst({
      where: { toolId: event.toolId },
      orderBy: { occurredAt: 'desc' },
    });

    const payloadJson = JSON.stringify(event.payload);
    const hash = createHash('sha256')
      .update(`${previous?.hashThis ?? ''}${event.toolId}${event.type}${payloadJson}`)
      .digest('hex');

    return client.historyEvent.create({
      data: {
        toolId: event.toolId,
        type: event.type,
        payload: payloadJson,
        hashPrev: previous?.hashThis ?? null,
        hashThis: hash,
      },
    });
  }

  async list(toolId: string) {
    return this.prisma.historyEvent.findMany({
      where: { toolId },
      orderBy: { occurredAt: 'desc' },
    });
  }
}
