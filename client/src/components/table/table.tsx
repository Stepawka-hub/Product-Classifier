import { TableUI } from "@ui/table";
import { TableProps } from "./type";

export const Table = <T extends object,>(props: TableProps<T>) => (
  <TableUI {...props} />
);
