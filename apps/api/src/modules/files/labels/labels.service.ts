import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LabelsService {
  private readonly template: string;

  constructor(private readonly prisma: PrismaService) {
    this.template = readFileSync(join(__dirname, '../../../templates/zpl/tool_label.zpl'), 'utf8');
  }

  async buildToolLabel(toolId: string) {
    const tool = await this.prisma.tool.findUnique({
      where: { id: toolId },
      include: { calibration: true },
    });
    if (!tool) {
      throw new Error('tool_not_found');
    }
    const due = tool.calibration?.dueAt?.toISOString().substring(0, 10) ?? 'N/A';
    const content = this.template
      .replace('{TOOL_NUMBER}', tool.toolNumber)
      .replace('{SERIAL}', tool.serialNumber)
      .replace('{CAL_DUE}', due)
      .replace('{BARCODE_DATA}', tool.toolNumber);
    return { zpl: content };
  }
}
