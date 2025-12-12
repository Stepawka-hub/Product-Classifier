// Сущность
export type TEntityId = number | string;

export type TEntity = {
  id: TEntityId;
};

// Заголовки таблиц
export type THeaders<T> = Record<keyof T, string>;

// Классификатор
export type TClassifier = TEntity & {
  name: string;
  unitName: string;
  parentName: string;
};

export type TClassifierShort = Pick<TClassifier, "id" | "name">;

// Изделие
export type TProduct = TEntity & {
  name: string;
  unitName: string | null;
  parentName: string | null;
  classifierName: string | null;
  baseProductName: string | null;
  versionNumber: number;
  isActive: boolean;
  dateCreated: string;
  datePlanned: string;
  dateActual: string | null;
};

export type TProductComponent = TEntity & {
  name: string;
  count: number;
  unitName: string;
};

// ЕИ
export type TUnit = TEntity & {
  name: string;
};

// Позиции спецификации
export type TSpecification = TEntity & {
  productName: string;
  componentName: string;
  consumption: number;
  forQuantity: number;
  flag: boolean;
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
  parentId: number | null;
  unitId: number | null;
  baseProductId: number | null;
  classifierId: number | null;
};

export type TCreateClassifierData = {
  name: string;
  parentName: string;
  unitName: string;
};

// Данные, необходимые для обновления сущностей
export type TUpdateUnitData = TUnit;

export type TUpdateProductData = TProduct;

export type TUpdateClassifierData = TEntity &
  TCreateClassifierData & {
    needInheritInLeaves: boolean;
  };

// Пагинация
export type TPagination = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
};

export type TargetId = TEntityId | null;
