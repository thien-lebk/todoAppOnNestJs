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

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ProjectDto } from './dto/project.dto';
import { ProjectPayload } from './interface/project-payload.interface';
import { ProjectService } from './service/project.service';
import { TablePayload } from 'src/utils/dto/table.dto';
import { TableResponsePayload } from 'src/utils/payload/table.payload';

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
  getListProjectByUser(@GetUser() user: User, @Param() table: TablePayload) {
    return this.projectService.getListProjectByUser(
      user,
      table.page ?? 1,
      table.pageSize ?? 10,
    );
  }

  @Delete(':uuid')
  deleteProject(
    @GetUser() user: User,
    @Param('uuid') uuid: string,
  ): Promise<ProjectPayload> {
    return this.projectService.deleteProject(user, uuid);
  }
}
