import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateTransferDto {
  @ApiProperty()
  @IsUUID()
  toolId!: string;

  @ApiProperty()
  @IsString()
  toWarehouse!: string;
}
