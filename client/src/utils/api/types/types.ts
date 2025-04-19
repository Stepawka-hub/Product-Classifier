export type TServerResponse = {
  resultCode: number;
  message: string;
};

export type TPaginatedResponse<T> = {
  items: T[];
  total: number;
};

export type PaginationParams = {
  page: number;
  limit: number;
};
