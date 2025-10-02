import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class ReceiveCalibrationDto {
  @ApiProperty()
  @IsUUID()
  toolId!: string;

  @ApiProperty()
  @IsDateString()
  dueAt!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certificateUrl?: string;
}
