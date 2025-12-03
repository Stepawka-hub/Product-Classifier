import { TTableConfig } from "@ui/table/type";
import { TargetId } from '@utils/types';

export type TableRowProps<T> = Pick<TTableConfig<T>, "headers"> & {
  rowData: T;
  selectable?: boolean;
  selectedItemId?: TargetId;
  setSelectedItem?: (i: TargetId) => void;
};
