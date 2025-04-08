import { Button } from "@components/common/buttons";
import { BasePage } from "@pages";
import { FC } from "react";
import { CategoriesPageUIProps } from "./type";

export const CategoriesPageUI: FC<CategoriesPageUIProps> = ({
  addCategory
}) => (
  <BasePage title="Категории">
    <div className='content'>
      <div>Какие-то категории...</div>
      <div>
        <Button
          type="plus"
          children='Добавить категорию'
          className='actionButton'
          onClick={addCategory}
        />
      </div>
    </div>
  </BasePage>
);
