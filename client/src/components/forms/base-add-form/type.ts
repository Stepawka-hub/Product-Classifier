import { ReactElement } from "react";
import { AddFormProps } from "../types/types";

export type BaseAddFormProps = AddFormProps & {
  title: string;
  isAdding: boolean;
  children: ReactElement;
  onSubmit: () => void;
};
