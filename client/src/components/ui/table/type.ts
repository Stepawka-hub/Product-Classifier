import { TTableConfig } from '@components/types';
import { TPagination } from '@utils/types';

export type TableUIProps<T> = TTableConfig<T> & {
  pagination: TPagination;
}
