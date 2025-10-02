import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  list() {
    return this.service.list();
  }
}
