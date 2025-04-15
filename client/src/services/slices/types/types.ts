import { TCategory, TProduct, TUnit } from '@utils/types';

export type TInitialAppState = {
  isInitialized: boolean;
};

export type TInitialProductState = {
  products: TProduct[];
};

export type TInitialCategoryState = {
  categories: TCategory[];
};

export type TInitialUnitState = {
  units: TUnit[];
};