import { ReactElement } from "react";

export type ModalProps = {
  children?: ReactElement;
  onClose: () => void;
};
