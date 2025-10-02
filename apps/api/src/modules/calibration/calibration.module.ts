import { Module } from '@nestjs/common';
import { CalibrationService } from './calibration.service';
import { CalibrationController } from './calibration.controller';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [HistoryModule],
  controllers: [CalibrationController],
  providers: [CalibrationService],
})
export class CalibrationModule {}
