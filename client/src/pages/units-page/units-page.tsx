import { UnitsPageUI } from '@ui-pages';

export const UnitsPage = () => {
  const addUnit = () => alert('Добавление ЕИ');
  return <UnitsPageUI addUnit={addUnit} />
}