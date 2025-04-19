import { ChangeEventHandler } from "react";
import { AddFormUIProps } from "../types/types";

export type AddProductFormUIProps = AddFormUIProps & {
  formData: AddProductFormData;
  onChange: (
    key: keyof AddProductFormData
  ) => ChangeEventHandler<HTMLInputElement>;
};

type AddProductFormData = {
  name: string;
  parentId: string;
  unitId: string;
};
