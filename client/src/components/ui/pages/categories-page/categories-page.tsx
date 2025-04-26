import { TablePage } from "@pages";
import { TCategory } from "@utils/types";
import { FC } from "react";
import { CategoriesPageUIProps } from "./type";

export const CategoriesPageUI: FC<CategoriesPageUIProps> = (props) => (
  <TablePage<TCategory>
    title="Категории"
    addButtonLabel="Добавить категорию"
    {...props}
  />
);
