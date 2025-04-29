import { TTableConfig } from "@components/types";

export type TableRowProps<T> = Pick<TTableConfig<T>, "headers" | "actions"> & {
  rowData: T;
  isRemoving?: boolean;
};
