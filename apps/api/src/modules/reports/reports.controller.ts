import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('calibration-due')
  calibrationDue() {
    return this.service.calibrationDue();
  }
}
