import { TPagination } from "@utils/types";
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
  actions?: TTableActions<T>;
};

export type TTableActions<T> = {
  deletion?: {
    removingIds: (string | number)[];
    onDelete: (id: number) => void;
  };
  selection?: {
    selectedItem: T | null;
    onSelect: (item: T) => void;
  };
  onEdit?: (item: T) => void;
};
