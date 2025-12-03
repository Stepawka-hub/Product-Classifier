import { TargetId, TPagination } from "@utils/types";

export type TTableConfig<T> = {
  headers: Record<keyof T, string>;
  data: T[];
};

export type TableProps<T> = TTableConfig<T> & {
  pagination: TPagination;
  selectable?: boolean;
  selectedItemId?: TargetId;
  setSelectedItem?: (i: TargetId) => void;
};
