import { createSelector } from "@reduxjs/toolkit";
import {
  getEditingItemIdSelector,
  getProductsSelector,
} from "@slices/products";

export const getEditingProductSelector = createSelector(
  [getProductsSelector, getEditingItemIdSelector],
  (products, editingItemId) => products.find((p) => p.id === editingItemId)
);
