import { MouseEventHandler, ReactElement } from "react";

export type ModalPropsUI = {
  children?: ReactElement;
  onOverlayClick: MouseEventHandler;
  onClose: () => void;
};
