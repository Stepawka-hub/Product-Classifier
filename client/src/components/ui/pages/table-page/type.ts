import { ReactElement } from 'react';

export type TablePageUIProps<T> = {
  title: string;
  headers: Record<keyof T, string>;
  data: T[];
  addButtonLabel: string;
  renderModal: ReactElement;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};
