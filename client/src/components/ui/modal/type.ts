import { ReactElement } from 'react';

export type ModalPropsUI = {
  children?: ReactElement;
  onClose: () => void;
};