import { TCategory, TProduct, TUnit } from "./types";

export const productsHeaders: Record<keyof TProduct, string> = {
  id: "ID изделия",
  name: "Название",
  parentName: "Категория",
  unitName: "Единицы измерения",
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