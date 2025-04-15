import { Button } from "@components/common/buttons";
import s from "./table.module.css";
import { TableUIProps } from "./type";

export const TableUI = <T extends object>({
  headers,
  elements,
}: TableUIProps<T>) => {
  const headerElements = headers.map((h) => <th>{h}</th>);
  const cellElements = elements.map((el) => (
    <tr className={s.trow}>
      {Object.values(el).map((v) => (
        <td>{String(v)}</td>
      ))}
      <td className={s.actions}>
        <Button type="edit" size="small" />
        <Button type="cross" size="small" />
      </td>
    </tr>
  ));

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead className={s.thead}>
          {headerElements}
          <th>Действия</th>
        </thead>
        <tbody className={s.tbody}>{cellElements}</tbody>
      </table>
    </div>
  );
};
