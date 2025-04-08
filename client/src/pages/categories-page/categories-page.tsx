import { CategoriesPageUI } from '@ui/pages';

export const CategoriesPage = () => {
  const addCategory = () => alert('Добавление категории');
  return <CategoriesPageUI addCategory={addCategory} />
}