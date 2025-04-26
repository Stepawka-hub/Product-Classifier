import { MouseEventHandler, ReactNode } from "react";

export type ModalPropsUI = {
  children: ReactNode | null;
  onOverlayClick: MouseEventHandler;
  onClose: () => void;
};
