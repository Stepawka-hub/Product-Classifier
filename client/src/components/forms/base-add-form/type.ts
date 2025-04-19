import { ReactElement } from "react";
import { AddFormProps } from "../types/types";

export type BaseAddFormProps = AddFormProps & {
  children: ReactElement;
  isAdding: boolean;
  onSubmit: () => void;
};
