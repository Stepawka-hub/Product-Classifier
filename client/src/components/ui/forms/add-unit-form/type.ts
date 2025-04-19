import { ChangeEvent } from 'react';
import { AddFormUIProps } from '../types/types';

export type AddUnitFormUIProps = AddFormUIProps & {
  unitName: string;
  onChangeUnitName: (e: ChangeEvent<HTMLInputElement>) => void;
};