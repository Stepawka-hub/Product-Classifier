import { TPagination } from "@utils/types";

export type TEntityPageUI<T> = {
  tableConfig: TTableConfig<T>;
  pagination: TPagination;
  openModal: () => void;
};

export type TTableConfig<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  onEdit: () => void;
  onDelete: (id: number) => void;
};