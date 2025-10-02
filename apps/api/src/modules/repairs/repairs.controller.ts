import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RepairsService } from './repairs.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('repairs')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('repairs')
export class RepairsController {
  constructor(private readonly service: RepairsService) {}

  @Post()
  create(@Body() dto: CreateRepairDto, @Req() req: any) {
    return this.service.create(dto, req.user?.id ?? 'unknown');
  }
}
