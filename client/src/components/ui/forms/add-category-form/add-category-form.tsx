import { BaseAddForm } from "@components/forms";
import { FC } from "react";
import { AddCategoryFormUIProps } from "./type";

export const AddCategoryFormUI: FC<AddCategoryFormUIProps> = ({
  formData,
  onChange,
  ...props
}) => (
  <BaseAddForm {...props}>
    <>
      <input
        value={formData.name}
        onChange={onChange("name")}
        placeholder="Название категории"
        required
      />
      <input
        value={formData.parentName}
        onChange={onChange("parentName")}
        placeholder="Название родительской категории"
        required
      />
      <input
        value={formData.unitName}
        onChange={onChange("unitName")}
        placeholder="Название ЕИ"
        required
      />
    </>
  </BaseAddForm>
);
