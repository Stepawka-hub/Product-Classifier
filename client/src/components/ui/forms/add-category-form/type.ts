import { ChangeEventHandler } from "react";
import { AddFormUIProps } from "../types/types";

export type AddCategoryFormUIProps = AddFormUIProps & {
  formData: AddCategoryFormData;
  onChange: (
    key: keyof AddCategoryFormData
  ) => ChangeEventHandler<HTMLInputElement>;
};

type AddCategoryFormData = {
  name: string;
  parentName: string;
  unitName: string;
};
