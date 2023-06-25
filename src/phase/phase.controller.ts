import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { PhaseService } from './service/phase.service';
import { PhaseDto } from './dto/phase';
import { PhasePayload } from './interface/phase-payload.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires

@ApiTags('Phase')
@ApiBearerAuth()
@Controller('phase')
@UseGuards(AuthGuard())
export class PhaseController {
  constructor(private phaseService: PhaseService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(
    @GetUser() user: User,
    @Body() phaseDto: PhaseDto,
  ): Promise<PhasePayload> {
    return this.phaseService.createPhase(phaseDto, user);
  }
  @Get('project/:uuid')
  getListPhaseByProject(
    @Param('uuid') uuid: string,
    @GetUser() user: User,
  ): Promise<PhasePayload[]> {
    return this.phaseService.getListPhaseByProject(uuid, user);
  }
  @Get(':uuid')
  getPhaseDetail(
    @Param('uuid') uuid: string,
    @GetUser() user: User,
  ): Promise<PhasePayload> {
    return this.phaseService.getPhaseByUuidAndUser(uuid, user);
  }

  @Delete()
  deleteProject(@GetUser() uuid: string) {
    return this.phaseService.deletePhase(uuid);
  }
}
