import { getCategoriesSelector } from "@slices/categories";
import { useSelector } from "@store";
import { CategoriesPageUI } from "@ui/pages";
import { categoriesHeaders } from '@utils/constants';

export const CategoriesPage = () => {
  const categories = useSelector(getCategoriesSelector);

  const addCategory = () => alert("Добавление категории");

  return (
    <CategoriesPageUI
      headers={categoriesHeaders}
      categories={categories}
      addCategory={addCategory}
    />
  );
};
