export interface TodoPayload {
  id?: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  parent?: TodoPayload;
}
