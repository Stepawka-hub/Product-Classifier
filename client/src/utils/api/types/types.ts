import { TClassifier, TPaginatedData, TProduct, TUnit } from "@utils/types";

export type TServerResponse = {
  resultCode: number;
  message: string;
};

export type TAppData = {
  classifiers: TPaginatedData<TClassifier>;
  products: TPaginatedData<TProduct>;
  units: TPaginatedData<TUnit>;
};

export type PaginationParams = {
  page: number;
  limit: number;
};
