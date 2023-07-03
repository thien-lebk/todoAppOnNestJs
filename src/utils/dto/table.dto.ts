import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class TablePayload {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page = 1;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize = 10;
}
