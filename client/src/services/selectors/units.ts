import { createSelector } from "@reduxjs/toolkit";
import { getEditingItemIdSelector, getUnitsSelector } from "@slices/units";

export const getEditingUnitSelector = createSelector(
  [getUnitsSelector, getEditingItemIdSelector],
  (units, editingItemId) => units.find((u) => u.id === editingItemId)
);
