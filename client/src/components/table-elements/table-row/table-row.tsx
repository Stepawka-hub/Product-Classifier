import { TableCell } from "@components/table-elements";
import { TEntity } from "@utils/types";
import { TableRowProps } from "./type";
import clsx from "clsx";
import s from "@ui/table/table.module.css";

export const TableRow = <T extends TEntity>({
  rowData,
  headers,
  selectable = true,
  selectedItemId,
  setSelectedItem,
}: TableRowProps<T>) => {
  const isSelected = selectedItemId === rowData.id;

  // Указываем, что это не просто массив строк, а массив ключей типа T
  const data = Object.keys(headers) as Array<keyof T>;

  /* Проходим по массиву ключей. По ключу достаём значение объекта
  и прокидываем его в компонент. Тем самым соблюдаем верный порядок ячеек */
  const cellElements = data.map((key, idx) => (
    <TableCell key={idx} value={rowData[key]} />
  ));

  const handleSelect = () => {
    const value = isSelected ? null : rowData.id;
    setSelectedItem?.(value);
  };

  return (
    <tr
      className={clsx(s.trow, {
        [s.selectable]: selectable,
        [s.selected]: isSelected,
      })}
      onClick={handleSelect}
    >
      {cellElements}
    </tr>
  );
};
