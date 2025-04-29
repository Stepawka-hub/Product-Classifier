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
  removingIds: (string | number)[];
  onEdit: (e: T) => void;
  onDelete: (id: number) => void;
};
