import { Project } from '../entity/project.entity';

const convertProjectToPayload = (project: Project) => {
  return {
    uuid: project.uuid,
    name: project.name,
    description: project.description,
    users: project.users.map((ele) => ({
      uuid: ele.uuid,
      name: ele.userInfo?.fullName,
      email: ele.username,
    })),
  };
};
export { convertProjectToPayload };
