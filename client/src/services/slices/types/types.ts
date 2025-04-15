import { TCategory, TProduct, TUnit } from '@utils/types';

export type TInitialAppState = {
  isInitialized: boolean;
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