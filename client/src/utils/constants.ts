import { TCategory, TCategoryShort, TProduct, TUnit } from "./types";

export const productsHeaders: Record<keyof TProduct, string> = {
  id: "ID изделия",
  name: "Название",
  parentName: "Категория",
  unitName: "Единица измерения",
};

export const categoriesHeaders: Record<keyof TCategory, string> = {
  id: "ID категории",
  name: "Название",
  parentName: "Родительская категория",
  unitName: "Единица измерения",
};

export const unitsHeaders: Record<keyof TUnit, string> = {
  id: "ID Единицы измерения",
  name: "Название",
};

export const shortCategoriesHeaders: Record<keyof TCategoryShort, string> = {
  id: "ID категории",
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
