import { TUnit } from '@utils/types';

export type UnitsPageUIProps = {
  headers: string[];
  units: TUnit[];
  showModal: boolean;
  handleShowModal: () => void;
  handleCloseModal: () => void;
};