import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('files')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Post('presign')
  presign(@Body() body: { key: string; contentType: string }) {
    return this.service.createUploadUrl(body.key, body.contentType);
  }
}
