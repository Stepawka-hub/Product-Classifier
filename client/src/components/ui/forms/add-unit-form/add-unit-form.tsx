import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddEntityFormUIProps } from "../types/types";
import { TCreateUnitForm } from "@components/forms/types/types";

export const AddUnitFormUI: FC<AddEntityFormUIProps<TCreateUnitForm>> = ({
  formData,
  onChange,
  ...props
}) => (
  <BaseAddForm {...props}>
    <input
      value={formData.name}
      onChange={onChange("name")}
      placeholder="Название ЕИ"
      required
    />
  </BaseAddForm>
);
