import { MouseEventHandler, ReactNode } from "react";

export type ModalPropsUI = {
  isOpen: boolean;
  children: ReactNode | null;
  onOverlayClick: MouseEventHandler;
  onClose: () => void;
};
