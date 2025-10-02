import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WarehousesService } from './warehouses.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('warehouses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly service: WarehousesService) {}

  @Get()
  list() {
    return this.service.list();
  }
}
