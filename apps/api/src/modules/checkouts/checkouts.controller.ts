import { Body, Controller, UseGuards, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CheckoutsService } from './checkouts.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@ApiTags('checkouts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly service: CheckoutsService) {}

  @Post()
  checkout(@Body() dto: CreateCheckoutDto, @Req() req: any) {
    return this.service.create({ ...dto, actorId: req.user?.id ?? dto.userId, capability: req.user?.capabilities ?? [] });
  }
}
