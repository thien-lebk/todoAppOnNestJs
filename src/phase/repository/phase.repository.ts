import { EntityRepository, Repository } from 'typeorm';
import { Phase } from '../entity/phase.entity';

@EntityRepository(Phase)
export class PhaseRepository extends Repository<Phase> {}
