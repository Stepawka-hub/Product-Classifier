import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddProductFormUIProps } from "./type";

export const AddProductFormUI: FC<AddProductFormUIProps> = ({
  formData,
  onChange,
  ...props
}) => (
  <BaseAddForm {...props}>
    <>
      <input
        value={formData.name}
        onChange={onChange("name")}
        placeholder="Название продукта"
        required
      />
      <input
        value={formData.parentId}
        onChange={onChange("parentId")}
        placeholder="ID категории"
        required
      />
      <input
        value={formData.unitId}
        onChange={onChange("unitId")}
        placeholder="ID ЕИ"
        required
      />
    </>
  </BaseAddForm>
);
