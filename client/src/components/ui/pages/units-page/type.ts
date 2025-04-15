import { TUnit } from '@utils/types';

export type UnitsPageUIProps = {
  headers: string[];
  units: TUnit[];
  addUnit: () => void;
};