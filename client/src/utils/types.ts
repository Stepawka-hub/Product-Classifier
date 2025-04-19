export type TCategory = {
  id: number;
  name: string;
  unitName: string;
  parentName: string;
};

export type TProduct = TCategory;

export type TUnit = {
  id: number;
  name: string;
};

export type TAppData = {
  categories: TCategory[];
  products: TProduct[];
  units: TUnit[];
};

export type TToast = {
  id: string;
  message: string;
  type: "default" | "error" | "success";
  duration: number;
};

export type TNewToastData = Omit<TToast, "id">;

export type TCreateUnitData = Pick<TUnit, 'name'>;

export type TCreateProductData = {
  name: string;
  unitId: number;
  parentId: number;
};
