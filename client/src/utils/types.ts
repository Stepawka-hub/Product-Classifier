// Сущность
export type TEntity = {
  id: number;
};

// Категория
export type TCategory = TEntity & {
  name: string;
  unitName: string;
  parentName: string;
};

export type TCategoryShort = Pick<TCategory, "id" | "name">;

// Изделие
export type TProduct = TCategory;

// ЕИ
export type TUnit = TEntity & {
  name: string;
};

// Сущность для пагинации
export type TPaginatedData<T> = {
  items: T[];
  total: number;
};

// Тосты
export type TToast = {
  id: string;
  message: string;
  type: "default" | "error" | "success";
  duration: number;
};

// Данные, необходимые для создания тостов
export type TCreateToastData = Omit<TToast, "id">;

// Данные, необходимые для создания сущностей
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

// Данные, необходимые для обновления сущностей
export type TUpdateUnitData = TUnit;
export type TUpdateProductData = TProduct;
export type TUpdateCategoryData = TEntity &
  TCreateCategoryData & {
    needInheritInLeaves: boolean;
  };

// Пагинация
export type TPagination = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
};

export type TargetId = number | null;
