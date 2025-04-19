export type TableUIProps<T> = {
  headers: Record<keyof T, string>;
  data: T[];
};