import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddUnitFormUIProps } from "./type";

export const AddUnitFormUI: FC<AddUnitFormUIProps> = ({
  unitName,
  onChangeUnitName,
  ...props
}) => (
  <BaseAddForm {...props}>
    <input
      value={unitName}
      onChange={onChangeUnitName}
      placeholder="Название ЕИ"
      required
    />
  </BaseAddForm>
);
