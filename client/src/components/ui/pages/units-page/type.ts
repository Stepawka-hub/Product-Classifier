import { TUnit } from '@utils/types';
import { ModalHandlers } from '../types/types';

export type UnitsPageUIProps = ModalHandlers & {
  units: TUnit[];
};