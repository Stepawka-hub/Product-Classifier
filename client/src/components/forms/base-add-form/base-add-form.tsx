import { BaseAddFormUI } from "@ui/forms";
import { FC } from "react";
import { BaseAddFormProps } from "./type";

export const BaseAddForm: FC<BaseAddFormProps> = (props) => (
  <BaseAddFormUI {...props} />
);
