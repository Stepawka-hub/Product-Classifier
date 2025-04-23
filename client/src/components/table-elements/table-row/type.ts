import { TTableConfig } from '@components/types';

export type TableRowProps<T> = Omit<TTableConfig<T>, 'data'> & {
  rowData: T;
};