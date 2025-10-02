import { Controller, UseGuards, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('tools')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tools')
export class ToolsController {
  constructor(private readonly service: ToolsService) {}

  @Post()
  create(@Body() dto: CreateToolDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('search') search?: string, @Query('status') status?: string) {
    return this.service.findAll({ search, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateToolDto) {
    return this.service.update(id, dto);
  }
}
