export type TCategory = {
  id: number;
  name: string;
  unitid: number;
  parentid: number;
};

export type TProduct = TCategory;

export type TUnit = {
  id: number;
  name: string;
};
