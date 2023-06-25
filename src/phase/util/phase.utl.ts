import { Phase } from '../entity/phase.entity';

const convertPhaseToPayload = (phase: Phase) => {
  return {
    uuid: phase.uuid,
    name: phase.name,
    description: phase.description,
    budget: phase.budget,
    startDate: phase.startDate,
    endDate: phase.endDate,
    project: {
      uuid: phase.project?.uuid,
      name: phase.project?.name,
    },
  };
};
export { convertPhaseToPayload };
