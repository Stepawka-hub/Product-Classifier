import { TablePage } from "@pages";
import { TCategory } from "@utils/types";
import { FC } from "react";
import { CategoriesPageUIProps } from "./type";

export const CategoriesPageUI: FC<CategoriesPageUIProps> = ({
  tableConfig,
  modalConfig,
  pagination,
}) => (
  <TablePage<TCategory>
    title="Категории"
    addButtonLabel="Добавить категорию"
    tableConfig={tableConfig}
    modalConfig={modalConfig}
    pagination={pagination}
  />
);
