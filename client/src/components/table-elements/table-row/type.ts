import { TTableConfig } from '@components/types';

export type TableRowProps<T> = Omit<TTableConfig<T>, 'data' | 'isRemoving'> & {
  rowData: T;
  isRemoving: boolean;
};