import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { HistoryService } from './history.service';

@ApiTags('history')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tools/:toolId/history')
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @Get()
  list(@Param('toolId') toolId: string) {
    return this.service.list(toolId);
  }
}
