import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TodoPhaseDto {
  @ApiProperty()
  @IsString()
  uuid: string;
}
