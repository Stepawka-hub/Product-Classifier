import { TModalProps } from '@components/modal/type';
import { MouseEventHandler } from "react";

export type ModalPropsUI = TModalProps & {
  onOverlayClick: MouseEventHandler;
};
