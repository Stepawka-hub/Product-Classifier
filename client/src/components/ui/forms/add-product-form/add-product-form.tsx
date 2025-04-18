import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddFormUIProps } from '../types/types';

export const AddProductFormUI: FC<AddFormUIProps> = (props) => (
  <BaseAddForm {...props}>
    <input placeholder="ID Продукта" />
  </BaseAddForm>
);
