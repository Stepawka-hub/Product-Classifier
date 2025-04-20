import { TPagination } from '@utils/types';
import { ReactElement } from "react";

export type TablePageProps<T> = {
  title: string;
  headers: Record<keyof T, string>;
  data: T[];
  addButtonLabel: string;
  renderModal: ReactElement;
  isModalOpen: boolean;
  pagination?: TPagination;
  onOpenModal: () => void;
  onCloseModal: () => void;
};
