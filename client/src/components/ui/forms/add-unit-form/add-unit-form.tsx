import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddUnitFormUIProps } from "./type";

export const AddUnitFormUI: FC<AddUnitFormUIProps> = (props) => (
  <BaseAddForm {...props}>
    <input placeholder="ID ЕИ"></input>
  </BaseAddForm>
);
