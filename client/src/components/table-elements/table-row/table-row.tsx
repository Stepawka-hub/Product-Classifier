import { TableCell } from "@components/table-elements";
import { TEntity } from "@utils/types";
import { TableRowProps } from "./type";
import clsx from "clsx";
import s from "@ui/table/table.module.css";

export const TableRow = <T extends TEntity>({
  rowData,
  headers,
  actions,
}: TableRowProps<T>) => {
  const { selection } = actions || {};
  const { onSelect, selectedItem } = selection || {};
  const isSelected = selectedItem === rowData.id;

  // Указываем, что это не просто массив строк, а массив ключей типа T
  const data = Object.keys(headers) as Array<keyof T>;

  /* Проходим по массиву ключей. По ключу достаём значение объекта
  и прокидываем его в компонент. Тем самым соблюдаем верный порядок ячеек */
  const cellElements = data.map((key, index) => (
    <TableCell key={index} value={rowData[key]} />
  ));

  const handleSelect = () => {
    const data = isSelected ? null : rowData.id;
    selection?.onSelect(data);
  };

  return (
    <tr
      className={clsx(s.trow, {
        [s.selectable]: onSelect,
        [s.selected]: isSelected,
      })}
      onClick={handleSelect}
    >
      {cellElements}
    </tr>
  );
};
