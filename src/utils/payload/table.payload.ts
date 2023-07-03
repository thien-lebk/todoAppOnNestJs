type TableResponsePayload<T> = {
  total: number;
  page: number;
  data: T[];
};

export { TableResponsePayload };
