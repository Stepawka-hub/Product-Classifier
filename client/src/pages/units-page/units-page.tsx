import { getUnitsSelector } from '@slices/units';
import { useSelector } from '@store';
import { UnitsPageUI } from "@ui-pages";

export const UnitsPage = () => {
  const units = useSelector(getUnitsSelector);
  const headers = [
    "ID Единицы измерения",
    "Название"
  ];
  const addUnit = () => alert("Добавление ЕИ");
  return <UnitsPageUI headers={headers} units={units} addUnit={addUnit} />;
};
