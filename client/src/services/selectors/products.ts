import { createSelector } from "@reduxjs/toolkit";
import {
  getProductsSelector,
  getSelectedItemIdSelector,
} from "@slices/products";

export const getSelectedProductSelector = createSelector(
  [getProductsSelector, getSelectedItemIdSelector],
  (products, selectedItemId) => products.find((p) => p.id === selectedItemId)
);
