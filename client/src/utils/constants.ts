import { TClassifier, TClassifierShort, TProduct, TUnit } from "./types";

export const productsHeaders: Record<keyof TProduct, string> = {
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
  dateActual: "Дата актуальности"
};

export const classifiersHeaders: Record<keyof TClassifier, string> = {
  id: "ID классификатора",
  name: "Название",
  parentName: "Родительский классификатор",
  unitName: "Единица измерения",
};

export const unitsHeaders: Record<keyof TUnit, string> = {
  id: "ID Единицы измерения",
  name: "Название",
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
