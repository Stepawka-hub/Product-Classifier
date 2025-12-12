import { createSelector } from "@reduxjs/toolkit";
import { getUnitsSelector, getSelectedItemIdSelector } from "@slices/units";

export const getSelectedUnitSelector = createSelector(
  [getUnitsSelector, getSelectedItemIdSelector],
  (units, selectedItemId) => units.find((u) => u.id === selectedItemId)
);
