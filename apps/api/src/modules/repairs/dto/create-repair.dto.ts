import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRepairDto {
  @ApiProperty()
  @IsUUID()
  toolId!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  resolution?: string;
}
