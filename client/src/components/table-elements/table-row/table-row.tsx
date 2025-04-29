import { Button } from "@components/common/buttons";
import { TableCell } from "@components/table-elements";
import s from "@ui/table/table.module.css";
import { TEntity } from "@utils/types";
import { TableRowProps } from "./type";

export const TableRow = <T extends TEntity>({
  rowData,
  headers,
  isRemoving = false,
  actions = {},
}: TableRowProps<T>) => {
  const { onEdit, deletion = {} } = actions;
  const { onDelete } = deletion;

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
        {onEdit && (
          <Button variant="edit" size="small" onClick={() => onEdit(rowData)} />
        )}
        {onDelete && (
          <Button
            variant="cross"
            size="small"
            disabled={isRemoving}
            onClick={() => onDelete(rowData.id)}
          />
        )}
      </td>
    </tr>
  );
};
