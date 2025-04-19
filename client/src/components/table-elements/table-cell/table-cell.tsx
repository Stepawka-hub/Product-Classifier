import { FC } from "react";
import { TableCellProps } from "./type";

export const TableCell: FC<TableCellProps> = ({ value }) => (
  <td>{value ? String(value) : "Нет"}</td>
);
