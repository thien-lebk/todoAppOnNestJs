import { Project } from '../entity/project.entity';
import { ProjectPayload } from '../interface/project-payload.interface';

const convertProjectToPayload = (project: Project): ProjectPayload => {
  return {
    uuid: project.uuid,
    name: project.name,
    description: project.description,
    budget: project.budget,
    startDate: project.startDate,
    endDate: project.endDate,
    users: project.users.map((ele) => ({
      uuid: ele.uuid,
      name: ele.userInfo?.fullName,
      email: ele.username,
    })),
  };
};
export { convertProjectToPayload };
