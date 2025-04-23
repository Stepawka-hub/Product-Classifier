import { TPagination } from "@utils/types";
import { ReactElement } from "react";

export type TEntityPageUI<T> = {
  tableConfig: TTableConfig<T>;
  modalConfig: TModalConfig;
  pagination: TPagination;
};

export type TTableConfig<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  onEdit: () => void;
  onDelete: (id: number) => void;
};

export type TModalConfig = {
  renderModal: ReactElement;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
