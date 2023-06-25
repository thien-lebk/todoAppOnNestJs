import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserProjectDto } from 'src/project/dto/user-project.dto';
import { TodoPhaseDto } from './todo-phase.dto';
export class TodoParentDto {
  @ApiProperty()
  @IsString()
  uuid: string;
}
export class TodoDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(500)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  estimatedTime: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  priority: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @ApiProperty({ type: UserProjectDto })
  user: UserProjectDto;

  @IsOptional()
  @ApiProperty({ type: TodoPhaseDto })
  phase: TodoPhaseDto;

  @IsOptional()
  @ApiProperty({ type: TodoParentDto })
  parent: TodoParentDto;
}
