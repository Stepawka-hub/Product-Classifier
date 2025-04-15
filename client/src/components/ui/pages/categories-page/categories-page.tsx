import { Button } from "@components/common/buttons";
import { BasePage } from "@pages";
import { FC } from "react";
import { CategoriesPageUIProps } from "./type";
import { TCategory } from "@utils/types";
import { Table } from "@components/table";

export const CategoriesPageUI: FC<CategoriesPageUIProps> = ({
  headers,
  categories,
  addCategory,
}) => (
  <BasePage title="Категории">
    <div className="content">
      <Table<TCategory> headers={headers} elements={categories} />
      <div>
        <Button
          type="plus"
          children="Добавить категорию"
          className="actionButton"
          onClick={addCategory}
        />
      </div>
    </div>
  </BasePage>
);
