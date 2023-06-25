import { BadRequestException, Inject, Injectable, Res } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { InjectRepository } from '@nestjs/typeorm';
import { PhaseRepository } from '../repository/phase.repository';
import { PhaseDto } from '../dto/phase';
import { PhasePayload } from '../interface/phase-payload.interface';
import { Phase } from '../entity/phase.entity';
import { convertPhaseToPayload } from '../util/phase.utl';
import { ProjectService } from 'src/project/service/project.service';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class PhaseService {
  constructor(
    @InjectRepository(PhaseRepository)
    private readonly phaseRepository: PhaseRepository,
    private readonly projectSerivce: ProjectService,
  ) {}
  async createPhase(phaseDto: PhaseDto, user: User): Promise<PhasePayload> {
    try {
      if (!phaseDto.project.uuid) {
        throw new BadRequestException('Project not found');
      }
      const project = await this.projectSerivce.getProjectByUuid(
        phaseDto.project.uuid,
        user.uuid,
      );
      if (!project) {
        throw new BadRequestException('Project not found');
      }
      const phase = new Phase();
      phase.name = phaseDto.name;
      phase.uuid = uuid();
      phase.description = phaseDto.description;
      phase.project = project;
      await phase.save();
      return convertPhaseToPayload(phase);
    } catch (error) {
      throw error;
    }
  }
  async getListPhaseByProject(
    projectUuid: string,
    user: User,
  ): Promise<PhasePayload[]> {
    try {
      if (!projectUuid)
        throw new BadRequestException('Project Uuid is required');
      const project = await this.projectSerivce.getProjectByUuid(
        projectUuid,
        user.uuid,
      );
      const phases = await this.phaseRepository.find({
        where: { project: project },
        relations: ['project'],
      });
      const phasePayload = phases.map((phase) => convertPhaseToPayload(phase));
      return phasePayload;
    } catch (error) {
      throw error;
    }
  }
  async getPhaseByUuidAndUser(uuid: string, user: User): Promise<PhasePayload> {
    try {
      const phase = await this.phaseRepository.findOne({
        where: { uuid },
        relations: ['project'],
      });

      if (!phase) throw new BadRequestException('Phase is not exist');
      if (!this.projectSerivce.isUserInProject(user.uuid, phase.project.uuid))
        throw new BadRequestException('Phase is not exist');

      return convertPhaseToPayload(phase);
    } catch (error) {
      throw error;
    }
  }
  async deletePhase(uuid: string): Promise<PhasePayload> {
    try {
      const phase = await this.phaseRepository.findOne({
        where: { uuid: uuid },
      });
      phase.isDeleted = true;
      return convertPhaseToPayload(phase);
    } catch (error) {
      throw error;
    }
  }
}
