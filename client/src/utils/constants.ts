import {
  TClassifier,
  TClassifierShort,
  THeaders,
  TProduct,
  TSpecification,
  TUnit,
} from "./types";

export const productsHeaders: THeaders<TProduct> = {
  id: "ID изделия",
  name: "Название",
  parentName: "Категория",
  unitName: "Единица измерения",
  classifierName: "Классификатор",
  baseProductName: "Базовое изделие",
  versionNumber: "Версия",
  isActive: "Активно",
  dateCreated: "Дата создания",
  datePlanned: "Дата планирования",
  dateActual: "Дата актуальности",
};

export const classifiersHeaders: THeaders<TClassifier> = {
  id: "ID классификатора",
  name: "Название",
  parentName: "Родительский классификатор",
  unitName: "Единица измерения",
};

export const unitsHeaders: THeaders<TUnit> = {
  id: "ID Единицы измерения",
  name: "Название",
};

export const specificationsHeaders: Omit<THeaders<TSpecification>, "id"> = {
  productName: "Товар",
  componentName: "Компонент",
  consumption: "Потребление",
  forQuantity: "Для количества",
  flag: "Актуальна",
};

export const shortClassifiersHeaders: Record<keyof TClassifierShort, string> = {
  id: "ID классификатора",
  name: "Название",
};

export const addBtnLabel = {
  default: "Добавить",
  disabled: "Добавление...",
};

export const editBtnLabel = {
  default: "Обновить",
  disabled: "Обновление...",
};
