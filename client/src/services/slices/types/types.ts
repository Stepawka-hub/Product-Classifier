import { TCategory, TPagination, TProduct, TToast, TUnit } from "@utils/types";
import { ReactNode } from 'react';

export type TInitialAppState = {
  isInitialized: boolean;
  isFillingData: boolean;
  isClearingData: boolean;
};

export type TCommonInitialState = {
  isLoading: boolean;
  isAdding: boolean;
  isRemoving: (string | number)[];
  pagination: Omit<TPagination, "setCurrentPage">;
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

export type TInitialModalState = {
  isOpen: boolean;
  content: ReactNode | null;
}

export type TToastsState = {
  toasts: TToast[];
  maxCount: number;
};
