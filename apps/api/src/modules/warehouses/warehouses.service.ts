import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.warehouse.findMany({
      include: { zones: true, shelves: true },
      orderBy: { code: 'asc' },
    });
  }
}
