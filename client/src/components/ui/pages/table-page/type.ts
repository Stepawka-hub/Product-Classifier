import { TTableConfig } from "@ui/table/type";
import { TargetId, TPagination } from "@utils/types";
import { ReactNode } from "react";

export type TablePageProps<T> = {
  title: string;
  tableConfig: TTableConfig<T>;
  headerActions?: ReactNode;
  footerActions?: ReactNode;
  pagination: TPagination;
  selectable?: boolean;
  selectedItemId?: TargetId;
  setSelectedItem?: (i: TargetId) => void;
};
