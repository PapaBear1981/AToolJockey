import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { LabelsService } from './labels/labels.service';
import { LabelsController } from './labels/labels.controller';
import { AppConfig } from '../config/app.config';

@Module({
  controllers: [FilesController, LabelsController],
  providers: [FilesService, LabelsService, AppConfig],
})
export class FilesModule {}
