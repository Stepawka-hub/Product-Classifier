export type TableProps<T> = {
  headers: Record<keyof T, string>;
  data: T[];
}