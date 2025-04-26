import { TTableConfig } from "@components/types";
import { TPagination } from "@utils/types";

export type TableProps<T> = TTableConfig<T> & {
  pagination: TPagination;
};
