import { ReactElement } from "react";

export type BaseAddFormUIProps = {
  children: ReactElement;
  onSubmit: () => void;
  onClose: () => void;
};
