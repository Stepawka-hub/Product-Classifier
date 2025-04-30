import { ActionCreatorWithPayload, Selector } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk } from "@thunks/types/types";
import { TargetId } from "@utils/types";
import { useCallback, useMemo } from "react";

type TUseTableActionsParams = {
  setEditingItemId: ActionCreatorWithPayload<TargetId, string>;
  setSelectedItemId?: ActionCreatorWithPayload<TargetId, string>;
  getSelectedItemId?: Selector<RootState, TargetId>;
  getRemovingIdsSelector: Selector<RootState, (string | number)[]>;
  deleteElementAsync: TDeleteEntityThunk;
  openEditForm: () => void;
};

export const useTableActions = ({
  getRemovingIdsSelector,
  getSelectedItemId,
  setEditingItemId,
  setSelectedItemId,
  deleteElementAsync,
  openEditForm,
}: TUseTableActionsParams) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(getSelectedItemId ?? (() => null));
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
    (element: TargetId) => {
      if (setSelectedItemId) {
        dispatch(setSelectedItemId(element));
      }
    },
    [dispatch, setSelectedItemId]
  );

  return useMemo(() => {
    const actions = {
      deletion: {
        removingIds,
        onDelete: handleDelete,
      },
      onEdit: handleEdit,
    };

    if (setSelectedItemId) {
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
    setSelectedItemId,
  ]);
};
