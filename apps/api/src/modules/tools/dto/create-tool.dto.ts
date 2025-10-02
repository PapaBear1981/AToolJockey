import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateToolDto {
  @ApiProperty()
  @IsString()
  toolNumber!: string;

  @ApiProperty()
  @IsString()
  serialNumber!: string;

  @ApiProperty({ enum: ['SERVICEABLE', 'OUT_OF_SERVICE', 'QUARANTINED', 'IN_TRANSIT', 'CHECKED_OUT'] })
  @IsString()
  status!: string;

  @ApiProperty()
  @IsUUID()
  warehouseId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  zoneId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  shelfId?: string;

  @ApiProperty()
  @IsUUID()
  toolTypeId!: string;
}
