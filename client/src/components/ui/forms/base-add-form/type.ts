import { ReactElement } from "react";
import { AddFormUIProps } from "../types/types";

export type BaseAddFormUIProps = AddFormUIProps & {
  children: ReactElement;
};
