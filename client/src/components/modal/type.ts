import { ReactElement } from "react";

export type ModalProps = {
  children?: ReactElement;
  delay?: number;
  onClose: () => void;
};
