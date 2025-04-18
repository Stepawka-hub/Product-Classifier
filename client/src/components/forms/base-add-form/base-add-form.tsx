import { BaseAddFormUI } from "@ui/forms";
import { FC } from "react";
import { BaseAddFormProps } from "./type";

export const BaseAddForm: FC<BaseAddFormProps> = ({
  children,
  onSubmit,
  onClose,
}) => (
  <BaseAddFormUI onSubmit={onSubmit} onClose={onClose}>
    {children}
  </BaseAddFormUI>
);
