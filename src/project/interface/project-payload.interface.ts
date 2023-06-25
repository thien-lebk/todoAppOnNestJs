export interface UserProjectPayload {
  uuid: string;
  name: string;
  email: string;
}

export interface ProjectPayload {
  uuid: string;
  name: string;
  description: string;
  users: UserProjectPayload[];
}
