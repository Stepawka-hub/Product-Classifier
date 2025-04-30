import {
  TCategory,
  TCategoryShort,
  TPagination,
  TProduct,
  TToast,
  TUnit,
} from "@utils/types";
import { ReactNode } from "react";

export type TInitialAppState = {
  isInitialized: boolean;
  isFillingData: boolean;
  isClearingData: boolean;
};

export type TCommonInitialState = {
  isLoading: boolean;
  isAdding: boolean;
  removingIds: (string | number)[];
  pagination: Omit<TPagination, "setCurrentPage">;
};

export type TEditingState<T> = {
  editingItem: T | null;
  isUpdating: boolean;
};

export type TSelectingState<T> = {
  selectedItem: T | null;
};

export type TInitialProductState = TCommonInitialState &
  TEditingState<TProduct> & {
    products: TProduct[];
  };

export type TInitialCategoryState = TCommonInitialState &
  TSelectingState<TCategory> &
  TEditingState<TCategory> & {
    categories: TCategory[];
    parents: TCategoryShort[];
    children: TCategoryShort[];

    isFetchParents: boolean;
    isFetchChildren: boolean;

    nodesPagination: Omit<TPagination, "setCurrentPage">;
  };

export type TInitialUnitState = TCommonInitialState &
  TEditingState<TUnit> & {
    units: TUnit[];
  };

export type TInitialModalState = {
  isOpen: boolean;
  content: ReactNode | null;
};

export type TToastsState = {
  toasts: TToast[];
  maxCount: number;
};
