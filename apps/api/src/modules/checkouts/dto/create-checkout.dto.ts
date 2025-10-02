import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCheckoutDto {
  @ApiProperty()
  @IsUUID()
  toolId!: string;

  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  overrideReason?: string;
}
