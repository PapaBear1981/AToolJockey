import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('transfers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('transfers')
export class TransfersController {
  constructor(private readonly service: TransfersService) {}

  @Post()
  create(@Body() dto: CreateTransferDto, @Req() req: any) {
    return this.service.create(dto, req.user?.id ?? 'unknown');
  }
}
