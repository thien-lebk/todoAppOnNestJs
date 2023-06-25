import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

class ProjectPhase {
  @ApiProperty()
  @IsString()
  uuid: string;
}

export class PhaseDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  uuid: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ type: ProjectPhase })
  project: ProjectPhase;
}
