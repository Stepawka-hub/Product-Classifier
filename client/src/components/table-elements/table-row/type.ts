export type TableRowProps<T> = {
  rowData: T;
  headers: Record<keyof T, string>;
  onEdit?: () => void;
  onDelete?: () => void;
};
