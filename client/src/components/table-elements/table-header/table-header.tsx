import { FC } from "react";
import { TableHeaderProps } from "./type";
import s from "@ui/table/table.module.css";

export const TableHeader: FC<TableHeaderProps> = ({
  headers,
  showActionsColumn,
}) => (
  <thead className={s.thead}>
    <tr>
      {headers.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
      {showActionsColumn && <th>Действия</th>}
    </tr>
  </thead>
);
