import { TCategory, TPaginatedData, TProduct, TUnit } from "@utils/types";

export type TServerResponse = {
  resultCode: number;
  message: string;
};

export type TAppData = {
  categories: TPaginatedData<TCategory>;
  products: TPaginatedData<TProduct>;
  units: TPaginatedData<TUnit>;
};

export type PaginationParams = {
  page: number;
  limit: number;
};
