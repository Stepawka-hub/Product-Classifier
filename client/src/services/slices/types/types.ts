import { TCategory, TProduct, TToast, TUnit } from '@utils/types';

export type TInitialAppState = {
  isInitialized: boolean;
  isFillingData: boolean;
  isClearingData: boolean;
};

export type TInitialProductState = {
  products: TProduct[];
  isLoading: boolean;
};

export type TInitialCategoryState = {
  categories: TCategory[];
  isLoading: boolean;
};

export type TInitialUnitState = {
  units: TUnit[];
  isLoading: boolean;
};

export type TToastsState = {
  toasts: TToast[];
  maxCount: number;
};