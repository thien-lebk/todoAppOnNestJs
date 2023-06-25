import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/entity/user.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ProjectDto } from './dto/project.dto';
import { ProjectPayload } from './interface/project-payload.interface';
import { ProjectService } from './service/project.service';

// < -- Swagger Implementation Start -- >
@ApiTags('Project')
@ApiBearerAuth()
// < -- Swagger Implementation End -- >
@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(
    @Body() projectDto: ProjectDto,
    @GetUser() user: User,
  ): Promise<ProjectPayload> {
    return this.projectService.createProject(projectDto, user);
  }
  @Get()
  getListProjectByUser(@GetUser() user: User): Promise<ProjectPayload[]> {
    return this.projectService.getListProjectByUser(user);
  }

  @Delete()
  deleteProject(@GetUser() user: User): Promise<ProjectPayload[]> {
    return this.projectService.getListProjectByUser(user);
  }
}
