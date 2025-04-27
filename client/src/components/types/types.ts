import { TPagination } from "@utils/types";

export type TEntityPageUI<T> = {
  tableConfig: TTableConfig<T>;
  pagination: TPagination;
  openAddForm: () => void;
};

export type TTableConfig<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  isRemoving: (string | number)[];
  onEdit: (e: T) => void;
  onDelete: (id: number) => void;
};