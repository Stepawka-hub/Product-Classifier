import { TCategory, TProduct, TToast, TUnit } from "@utils/types";

export type TInitialAppState = {
  isInitialized: boolean;
  isFillingData: boolean;
  isClearingData: boolean;
};

export type TCommonInitialState = {
  isLoading: boolean;
  isAdding: boolean;
  pagination: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
  };
};

export type TInitialProductState = TCommonInitialState & {
  products: TProduct[];
};

export type TInitialCategoryState = TCommonInitialState & {
  categories: TCategory[];
};

export type TInitialUnitState = TCommonInitialState & {
  units: TUnit[];
};

export type TToastsState = {
  toasts: TToast[];
  maxCount: number;
};


