import s from "./table.module.css";
import { TableUIProps } from "./type";
import { TableHeader, TableRow } from "@components/table-elements";

export const TableUI = <T extends object>({
  headers,
  data,
}: TableUIProps<T>) => (
  <div className={s.tableContainer}>
    <table className={s.table}>
      <TableHeader headers={Object.values(headers)} />
      <tbody className={s.tbody}>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            headers={headers}
            rowData={row}
            onEdit={() => null}
            onDelete={() => null}
          />
        ))}
      </tbody>
    </table>
  </div>
);
