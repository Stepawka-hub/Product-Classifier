import { BaseAddForm, Input } from "@components/forms";
import { FC } from "react";
import { AddEntityFormUIProps } from "../types/types";
import { TCreateProductForm } from "@components/forms/types/types";

export const AddProductFormUI: FC<AddEntityFormUIProps<TCreateProductForm>> = ({
  formData,
  onChange,
  ...props
}) => (
  <BaseAddForm {...props}>
    <>
      <Input
        label="Название продукта"
        value={formData.name}
        onChange={onChange("name")}
        required
      />
      <Input
        label="ID категории"
        value={formData.parentId}
        onChange={onChange("parentId")}
        type="number"
        required
      />
      <Input
        label="ID ЕИ"
        value={formData.unitId}
        onChange={onChange("unitId")}
        type="number"
        required
      />
    </>
  </BaseAddForm>
);
