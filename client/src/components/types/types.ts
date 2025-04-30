import { TargetId, TPagination } from "@utils/types";
import { ReactNode } from "react";

export type TEntityPageUI<T> = {
  tableConfig: TTableConfig<T>;
  pagination: TPagination;
  additionalActions?: ReactNode;
  openAddForm: () => void;
};

export type TTableConfig<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  actions?: TTableActions;
};

export type TTableActions = {
  deletion?: {
    removingIds: (string | number)[];
    onDelete: (id: number) => void;
  };
  selection?: {
    selectedItem: TargetId;
    onSelect: (item: TargetId) => void;
  };
  onEdit?: (itemId: number) => void;
};
