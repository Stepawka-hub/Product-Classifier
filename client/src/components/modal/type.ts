import { PropsWithChildren } from 'react';

export type TModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
}