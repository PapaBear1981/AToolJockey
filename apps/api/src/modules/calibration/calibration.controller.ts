import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CalibrationService } from './calibration.service';
import { ReceiveCalibrationDto } from './dto/receive-calibration.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('calibration')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('calibration')
export class CalibrationController {
  constructor(private readonly service: CalibrationService) {}

  @Post('receive')
  receive(@Body() dto: ReceiveCalibrationDto, @Req() req: any) {
    return this.service.receive(dto, req.user?.id ?? 'unknown');
  }
}
