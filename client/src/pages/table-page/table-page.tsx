import { TablePageUI } from "@ui/pages";
import { TablePageProps } from "./type";

export const TablePage = <T extends object>(props: TablePageProps<T>) => (
  <TablePageUI {...props} />
);
