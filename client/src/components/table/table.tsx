import { TableUI } from "@ui/table";
import { TableProps } from "./type";
import { TEntity } from '@utils/types';

export const Table = <T extends TEntity,>(props: TableProps<T>) => (
  <TableUI {...props} />
);
