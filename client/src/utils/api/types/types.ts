import { TUnit } from '@utils/types';

export type TServerResponse = {
  resultCode: number;
  message: string;
};

export type TCreateUnitData = Pick<TUnit, 'name'>;

export type TCreateProductData = {
  name: string;
  unitId: number;
  parentId: number;
};