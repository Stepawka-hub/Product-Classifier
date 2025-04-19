import { TUnit } from '@utils/types';
import { ModalHandlers } from '../types/types';
import { TPagination } from '@components/pagination/type';

export type UnitsPageUIProps = ModalHandlers & {
  units: TUnit[];
  pagination?: TPagination;
};