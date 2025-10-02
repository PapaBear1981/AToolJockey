import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateToolDto) {
    const duplicate = await this.prisma.tool.findFirst({
      where: { serialNumber: data.serialNumber, toolTypeId: data.toolTypeId ?? undefined },
    });
    if (duplicate) {
      throw new BadRequestException('duplicate_serial');
    }
    return this.prisma.tool.create({ data });
  }

  async findAll(query?: { search?: string; status?: string }) {
    return this.prisma.tool.findMany({
      where: {
        status: query?.status,
        OR: query?.search
          ? [
              { toolNumber: { contains: query.search, mode: 'insensitive' } },
              { serialNumber: { contains: query.search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      include: { warehouse: true },
      orderBy: { toolNumber: 'asc' },
      take: 200,
    });
  }

  async findOne(id: string) {
    const tool = await this.prisma.tool.findUnique({
      where: { id },
      include: { warehouse: true, history: { orderBy: { occurredAt: 'desc' }, take: 50 } },
    });
    if (!tool) {
      throw new NotFoundException('tool_not_found');
    }
    return tool;
  }

  async update(id: string, data: UpdateToolDto) {
    await this.findOne(id);
    return this.prisma.tool.update({ where: { id }, data });
  }
}
