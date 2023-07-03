import { PhaseDto } from 'src/phase/dto/phase';

export interface UserProjectPayload {
  uuid: string;
  name: string;
  email: string;
}

export interface ProjectPayload {
  uuid: string;
  name: string;
  description: string;
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  users: UserProjectPayload[];
}
