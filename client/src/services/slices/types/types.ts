import {
  TargetId,
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

export type TEditingState = {
  editingItemId: TargetId;
  isUpdating: boolean;
};

export type TSelectingState = {
  selectedItemId: TargetId;
};

export type TInitialProductState = TCommonInitialState &
  TEditingState & {
    products: TProduct[];
  };

export type TInitialCategoryState = TCommonInitialState &
  TSelectingState &
  TEditingState & {
    categories: TCategory[];
    parents: TCategoryShort[];
    children: TCategoryShort[];
    leaves: TProduct[];

    isFetchParents: boolean;
    isFetchChildren: boolean;
    isFetchLeaves: boolean;

    nodesPagination: Omit<TPagination, "setCurrentPage">;
  };

export type TInitialUnitState = TCommonInitialState &
  TEditingState & {
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
