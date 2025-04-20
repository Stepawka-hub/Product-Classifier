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

export type TPaginatedData<T> = {
  items: T[];
  total: number;
};

export type TAppData = {
  categories: TPaginatedData<TCategory>;
  products: TPaginatedData<TProduct>;
  units: TPaginatedData<TUnit>;
};

export type TToast = {
  id: string;
  message: string;
  type: "default" | "error" | "success";
  duration: number;
};

export type TNewToastData = Omit<TToast, "id">;

export type TCreateUnitData = Pick<TUnit, "name">;

export type TCreateProductData = {
  name: string;
  parentId: number;
  unitId: number;
};

export type TCreateCategoryData = {
  name: string;
  parentName: string;
  unitName: string;
};
