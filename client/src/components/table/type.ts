import { TPagination } from '@utils/types';


export type TableProps<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  pagination?: TPagination;
  onEdit: () => void;
  onDelete: () => void;
};
