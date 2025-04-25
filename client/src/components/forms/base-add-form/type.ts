import { ReactElement } from "react";
import { AddFormProps } from "../types/types";

export type BaseAddFormProps = AddFormProps & {
  children: ReactElement;
  onSubmit: () => void;
};
