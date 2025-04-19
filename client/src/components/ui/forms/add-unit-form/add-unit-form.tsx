import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddFormUIProps } from '../types/types';

export const AddUnitFormUI: FC<AddFormUIProps> = (props) => (
  <BaseAddForm {...props}>
    <input placeholder="Название ЕИ" />
  </BaseAddForm>
);
