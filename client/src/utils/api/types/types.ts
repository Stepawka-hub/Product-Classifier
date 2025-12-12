export type TServerResponse = {
  resultCode: number;
  message: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type TCalculateTotalConsumptionParams = PaginationParams & {
  count: number;
};
