import { FC } from "react";
import { TableCellProps } from "./type";

export const TableCell: FC<TableCellProps> = ({ value }) => {
  let formattedValue = "";

  if (typeof value === "boolean") {
    formattedValue = value ? "Да" : "Нет";
  } else {
    formattedValue = value ? String(value) : "Нет";
  }

  return <td>{formattedValue}</td>;
};
