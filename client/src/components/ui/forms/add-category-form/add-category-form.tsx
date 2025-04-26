import { BaseAddForm, Input } from "@components/forms";
import { FC } from "react";
import { AddEntityFormUIProps } from "../types/types";
import { TCreateCategoryForm } from "@components/forms/types/types";

export const AddCategoryFormUI: FC<
  AddEntityFormUIProps<TCreateCategoryForm>
> = ({ formData, onChange, ...props }) => (
  <BaseAddForm {...props}>
    <>
      <Input
        label="Название категории"
        value={formData.name}
        onChange={onChange("name")}
        required
      />
      <Input
        label="Название родительской категории"
        value={formData.parentName}
        onChange={onChange("parentName")}
      />
      <Input
        label="Название ЕИ"
        value={formData.unitName}
        onChange={onChange("unitName")}
      />
    </>
  </BaseAddForm>
);
