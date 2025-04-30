import { ActionCreatorWithPayload, Selector } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk } from "@thunks/types/types";
import { useCallback, useMemo } from "react";

type TUseTableActionsParams<T> = {
  setEditingItemId: ActionCreatorWithPayload<number | null, string>;
  setSelectedItem?: ActionCreatorWithPayload<T | null, string>;
  getSelectedItem?: Selector<RootState, T | null>;
  getRemovingIdsSelector: Selector<RootState, (string | number)[]>;
  deleteElementAsync: TDeleteEntityThunk;
  openEditForm: () => void;
};

export const useTableActions = <T>({
  getRemovingIdsSelector,
  getSelectedItem,
  setEditingItemId,
  setSelectedItem,
  deleteElementAsync,
  openEditForm,
}: TUseTableActionsParams<T>) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(getSelectedItem ?? (() => null));
  const removingIds = useSelector(getRemovingIdsSelector);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteElementAsync(id));
    },
    [dispatch, deleteElementAsync]
  );

  const handleEdit = useCallback(
    (elementId: number) => {
      dispatch(setEditingItemId(elementId));
      openEditForm();
    },
    [dispatch, setEditingItemId, openEditForm]
  );

  const handleSelect = useCallback(
    (element: T | null) => {
      if (setSelectedItem) {
        dispatch(setSelectedItem(element));
      }
    },
    [dispatch, setSelectedItem]
  );

  return useMemo(() => {
    const actions = {
      deletion: {
        removingIds,
        onDelete: handleDelete,
      },
      onEdit: handleEdit,
    };

    if (setSelectedItem) {
      return {
        ...actions,
        selection: {
          selectedItem,
          onSelect: handleSelect,
        },
      };
    }

    return actions;
  }, [
    selectedItem,
    removingIds,
    handleEdit,
    handleSelect,
    handleDelete,
    setSelectedItem,
  ]);
};
