import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddFormUIProps } from "../types/types";

export const AddCategoryFormUI: FC<AddFormUIProps> = (props) => (
  <BaseAddForm {...props}>
    <>
      <input placeholder="Название категории" />
      <input placeholder="Название родительской категории" />
      <input placeholder="Название ЕИ" />
    </>
  </BaseAddForm>
);
