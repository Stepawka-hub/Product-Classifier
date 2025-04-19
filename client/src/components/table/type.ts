import { TPagination } from '@components/pagination/type';

export type TableProps<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  pagination?: TPagination;
};
