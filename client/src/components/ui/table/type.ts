import { TPagination } from '@utils/types';

export type TableUIProps<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  pagination?: TPagination;
};
