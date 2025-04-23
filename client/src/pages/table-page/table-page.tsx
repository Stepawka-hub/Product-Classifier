import { TablePageUI } from "@ui/pages";
import { TablePageProps } from "./type";
import { TEntity } from '@utils/types';

export const TablePage = <T extends TEntity>(props: TablePageProps<T>) => (
  <TablePageUI {...props} />
);
