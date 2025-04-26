import { BaseAddForm, Input } from "@components/forms";
import { FC } from "react";
import { AddEntityFormUIProps } from "../types/types";
import { TCreateUnitForm } from "@components/forms/types/types";

export const AddUnitFormUI: FC<AddEntityFormUIProps<TCreateUnitForm>> = ({
  formData,
  onChange,
  ...props
}) => (
  <BaseAddForm {...props}>
    <Input
      label="Название ЕИ"
      value={formData.name}
      onChange={onChange("name")}
      required
    />
  </BaseAddForm>
);
