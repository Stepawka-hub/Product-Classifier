import { getCategoriesSelector } from "@slices/categories";
import { useSelector } from "@store";
import { CategoriesPageUI } from "@ui/pages";

export const CategoriesPage = () => {
  const categories = useSelector(getCategoriesSelector);
  const headers = ["ID категории", "Название категории", "ID родительской категории", "ID ЕИ"];

  const addCategory = () => alert("Добавление категории");

  return (
    <CategoriesPageUI
      headers={headers}
      categories={categories}
      addCategory={addCategory}
    />
  );
};
