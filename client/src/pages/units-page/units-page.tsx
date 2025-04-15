import { getUnitsSelector } from '@slices/units';
import { useSelector } from '@store';
import { UnitsPageUI } from "@ui-pages";
import { unitHeaders } from '@utils/constants';

export const UnitsPage = () => {
  const units = useSelector(getUnitsSelector);

  const addUnit = () => alert("Добавление ЕИ");

  return <UnitsPageUI headers={unitHeaders} units={units} addUnit={addUnit} />;
};
