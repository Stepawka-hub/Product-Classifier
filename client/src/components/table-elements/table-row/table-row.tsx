import s from "@ui/table/table.module.css";
import { TableCell } from "../table-cell";
import { Button } from "@components/common/buttons";
import { TableRowProps } from "./type";

export const TableRow = <T extends object>({
  rowData,
  headers,
  onEdit,
  onDelete,
}: TableRowProps<T>) => {
  // Указываем, что это не просто массив строк, а массив ключей типа T
  const data = Object.keys(headers) as Array<keyof T>;

  /* Проходим по массиву ключей. По ключу достаём значение объекта
  и прокидываем его в компонент. Тем самым соблюдаем верный порядок ячеек */
  const cellElements = data.map((key, index) => (
    <TableCell key={index} value={rowData[key]} />
  ));

  return (
    <tr className={s.trow}>
      {cellElements}
      <td className={s.actions}>
        <Button type="edit" size="small" onClick={onEdit} />
        <Button type="cross" size="small" onClick={onDelete} />
      </td>
    </tr>
  );
};
