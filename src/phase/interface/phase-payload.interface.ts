export interface ProjectPhasePayload {
  uuid: string;
  name: string;
}

export interface PhasePayload {
  uuid: string;
  name: string;
  description: string;
  budget: string;
  startDate: Date;
  endDate: Date;
  project: ProjectPhasePayload;
}
