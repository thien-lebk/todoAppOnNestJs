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
      const { name, description, users } = projectDto;
      const userList = await this.userService.getListUserByListUuid(
        users.map((ele) => ele.uuid),
      );
      const project = new Project();
      project.name = name;
      project.uuid = uuid();
      project.description = description;
      project.users = [...userList, user];
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
  async getListProjectByUser(user: User): Promise<ProjectPayload[]> {
    try {
      const projects = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.users', 'user')
        .where('user.uuid = :uuid', { uuid: user.uuid })
        .where('project.isDeleted = :isDelete', { isDelete: false })
        .getMany();

      const projectPayloads: ProjectPayload[] = projects.map((ele) =>
        convertProjectToPayload(ele),
      );
      return projectPayloads;
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
  async deleteProject(user: User, uuid: string): Promise<Project> {
    try {
      if (!uuid) {
        throw new BadRequestException('Uuid is required');
      }
      const project = await this.projectRepository.findOne({ where: { uuid } });
      if (!project) throw new Error('Project is not exist');
      project.isDeleted = true;
      return project.save();
    } catch (error) {
      throw error;
    }
  }
}
