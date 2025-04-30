import { Button } from "@components/common/buttons";
import { TableCell } from "@components/table-elements";
import { TEntity } from "@utils/types";
import { TableRowProps } from "./type";
import clsx from "clsx";
import s from "@ui/table/table.module.css";

export const TableRow = <T extends TEntity>({
  rowData,
  headers,
  isRemoving = false,
  actions = {},
}: TableRowProps<T>) => {
  const { onEdit, selection, deletion } = actions;
  const { onSelect, selectedItem } = selection || {};
  const isSelected = selectedItem?.id === rowData.id;

  // Указываем, что это не просто массив строк, а массив ключей типа T
  const data = Object.keys(headers) as Array<keyof T>;

  /* Проходим по массиву ключей. По ключу достаём значение объекта
  и прокидываем его в компонент. Тем самым соблюдаем верный порядок ячеек */
  const cellElements = data.map((key, index) => (
    <TableCell key={index} value={rowData[key]} />
  ));

  return (
    <tr
      className={clsx(s.trow, {
        [s.selectable]: onSelect,
        [s.selected]: isSelected,
      })}
      onClick={() => selection?.onSelect(isSelected ? null : rowData)}
    >
      {cellElements}

      <td className={s.actions}>
        {onEdit && (
          <Button variant="edit" size="small" onClick={() => onEdit(rowData)} />
        )}

        {deletion && (
          <Button
            variant="cross"
            size="small"
            disabled={isRemoving}
            onClick={() => deletion.onDelete(rowData.id)}
          />
        )}
      </td>
    </tr>
  );
};
