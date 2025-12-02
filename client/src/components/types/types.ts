import { TargetId, TPagination } from "@utils/types";
import { ReactNode } from "react";

export type TEntityPageUI<T> = {
  tableConfig: TTableConfig<T>;
  pagination: TPagination;
  headerActions?: ReactNode;
  footerActions?: ReactNode;
};

export type TTableConfig<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  actions?: TTableActions;
};

export type TTableActions = {
  selection?: {
    selectedItem: TargetId;
    onSelect: (item: TargetId) => void;
  };
};
