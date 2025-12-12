import { TargetId, THeaders, TPagination } from "@utils/types";

export type TTableConfig<T> = {
  headers: Partial<THeaders<T>>;
  data: T[];
};

export type TableProps<T> = TTableConfig<T> & {
  pagination: TPagination;
  selectable?: boolean;
  selectedItemId?: TargetId;
  setSelectedItem?: (i: TargetId) => void;
};
