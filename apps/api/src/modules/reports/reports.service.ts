import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async calibrationDue() {
    const upcoming = await this.prisma.calibration.findMany({
      where: { dueAt: { lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } },
      include: { tool: true },
      orderBy: { dueAt: 'asc' },
      take: 50,
    });
    return upcoming;
  }
}
