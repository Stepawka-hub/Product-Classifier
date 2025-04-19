import { TPagination } from "@components/pagination/type";

export type TableUIProps<T> = {
  headers: Record<keyof T, string>;
  data: T[];
  pagination?: TPagination;
};
