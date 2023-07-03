import { BadRequestException, Inject, Injectable, Res } from '@nestjs/common';
import { User } from '../../auth/entity/user.entity';
import { UserService } from 'src/user/service/user.service';
import { Project } from '../entity/project.entity';
import { ProjectDto } from '../dto/project.dto';
import { uuid } from 'uuidv4';
import { ProjectPayload } from '../interface/project-payload.interface';
import { convertProjectToPayload } from '../util/project.utl';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from '../repository/project.repository';
import { TableResponsePayload } from 'src/utils/payload/table.payload';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
    private userService: UserService,
  ) {}
  async createProject(
    projectDto: ProjectDto,
    user: User,
  ): Promise<ProjectPayload> {
    try {
      const {
        name,
        description,
        users = [],
        startDate,
        endDate,
        budget,
      } = projectDto;
      const userList = await this.userService.getListUserByListUuid(
        users.map((ele) => ele.uuid),
      );
      const project = new Project();
      project.name = name;
      project.uuid = uuid();
      project.description = description;
      project.startDate = startDate;
      project.endDate = endDate;
      project.budget = budget;
      project.users = [...userList, user];
      project.createdAt = new Date();
      project.updatedAt = new Date();
      await project.save();
      const projectPayload: ProjectPayload = convertProjectToPayload(project);
      return projectPayload;
    } catch (error) {
      throw error;
    }
  }
  async updateProject(
    projectDto: ProjectDto,
    user: User,
  ): Promise<ProjectPayload> {
    try {
      const { name, description, users, uuid } = projectDto;
      if (!uuid) {
        throw new BadRequestException('Uuid is required');
      }
      const project = await this.projectRepository.findOne({ where: { uuid } });
      if (!project) throw new Error('Project is not exist');
      const userList = await this.userService.getListUserByListUuid(
        users.map((ele) => ele.uuid),
      );
      project.name = name;
      project.description = description;
      project.users = [...userList, user];
      await project.save();
      const projectPayload: ProjectPayload = convertProjectToPayload(project);
      return projectPayload;
    } catch (error) {
      throw error;
    }
  }
  async getProjectByUuid(uuid: string, userUuid: string): Promise<Project> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.users', 'user')
        .where('user.uuid = :uuid', { uuid: userUuid })
        .where('project.isDeleted = :isDelete', { isDelete: false })
        .where('project.uuid = :uuid', { uuid: uuid })
        .getOne();
      if (!project) throw new BadRequestException('Project is not exist');
      return project;
    } catch (error) {
      throw error;
    }
  }
  async getListProjectByUser(
    user: User,
    page: number,
    pageSize: number,
  ): Promise<TableResponsePayload<ProjectPayload>> {
    try {
      const [projects, total] = await this.projectRepository
        .createQueryBuilder('project')
        .orderBy('project.createdAt', 'DESC', 'NULLS LAST')
        .leftJoinAndSelect('project.users', 'user')
        .where('user.uuid = :uuid', { uuid: user.uuid })
        .where('project.isDeleted = :isDelete', { isDelete: false })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
      const projectPayloads: ProjectPayload[] = projects.map((ele) =>
        convertProjectToPayload(ele),
      );
      return { data: projectPayloads, total: total, page };
    } catch (error) {
      throw error;
    }
  }
  async isUserInProject(
    userUuid: string,
    projectUuid: string,
  ): Promise<boolean> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.users', 'user')
        .where('user.uuid = :uuid', { uuid: userUuid })
        .where('project.isDeleted = :isDelete', { isDelete: false })
        .where('project.uuid =:projectUuid', { projectUuid })
        .getOne();

      return !!project;
    } catch (error) {
      throw error;
    }
  }
  async deleteProject(user: User, uuid: string): Promise<ProjectPayload> {
    try {
      if (!uuid) {
        throw new BadRequestException('Uuid is required');
      }
      const checkUserInProject = this.isUserInProject(user.uuid, uuid);
      if (!checkUserInProject) {
        throw new BadRequestException('User is not in project');
      }
      const project = await this.projectRepository.findOne({ where: { uuid } });
      if (!project) throw new Error('Project is not exist');
      project.isDeleted = true;
      await project.save();
      return convertProjectToPayload(project);
    } catch (error) {
      throw error;
    }
  }
}
