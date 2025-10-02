import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LabelsService } from './labels.service';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('labels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('labels')
export class LabelsController {
  constructor(private readonly service: LabelsService) {}

  @Post(':toolId/print')
  print(@Param('toolId') toolId: string) {
    return this.service.buildToolLabel(toolId);
  }
}
