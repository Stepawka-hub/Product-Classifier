import {
  TargetId,
  TClassifier,
  TClassifierShort,
  TPagination,
  TProduct,
  TProductComponent,
  TSpecification,
  TToast,
  TUnit,
} from "@utils/types";
import { ReactNode } from "react";

export type TInitialAppState = {
  isInitialized: boolean;
  isFillingData: boolean;
  isClearingData: boolean;
};

export type TActionsInitialState = {
  isLoading: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  pagination: Omit<TPagination, "setCurrentPage">;
};

export type TInitialProductState = TActionsInitialState & {
  products: TProduct[];
  selectedItemId: TargetId;

  isChangingVersion: boolean;
  isAddingModification: boolean;

  isCalculating: boolean;
  consumptionCalculation: TProductComponent[];
  consumptionPagination: Omit<TPagination, "setCurrentPage">;
};

export type TInitialClassifierState = TActionsInitialState & {
  classifiers: TClassifier[];
  selectedItemId: TargetId;

  parents: TClassifierShort[];
  children: TClassifierShort[];

  isFetchParents: boolean;
  isFetchChildren: boolean;
  isFetchLeaves: boolean;

  nodesPagination: Omit<TPagination, "setCurrentPage">;
};

export type TInitialUnitState = TActionsInitialState & {
  units: TUnit[];
  selectedItemId: TargetId;
};

export type TInitialSpecificationState = Pick<
  TActionsInitialState,
  "isLoading" | "pagination"
> & {
  specifications: TSpecification[];
};

export type TInitialModalState = {
  isOpen: boolean;
  content: ReactNode | null;
};

export type TToastsState = {
  toasts: TToast[];
  maxCount: number;
};
