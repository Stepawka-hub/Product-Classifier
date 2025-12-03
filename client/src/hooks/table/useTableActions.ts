import { ActionCreatorWithPayload, Selector } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk } from "@thunks/types/types";
import { TargetId } from "@utils/types";
import { useCallback } from "react";

type TUseTableActionsParams = {
  setSelectedItemId: ActionCreatorWithPayload<TargetId, string>;
  getSelectedItemId: Selector<RootState, TargetId>;
  deleteElementAsync: TDeleteEntityThunk;
  openEditForm: () => void;
};

export const useTableActions = ({
  getSelectedItemId,
  setSelectedItemId,
  deleteElementAsync,
}: TUseTableActionsParams) => {
  const dispatch = useDispatch();
  const selectedItemId = useSelector(getSelectedItemId);

  const handleSelect = useCallback(
    (element: TargetId) => {
      dispatch(setSelectedItemId(element));
    },
    [dispatch, setSelectedItemId]
  );

  const handleDelete = useCallback(() => {
    if (selectedItemId) {
      dispatch(deleteElementAsync(selectedItemId));
    }
  }, [dispatch, deleteElementAsync, selectedItemId]);

  return {
    selectedItemId,
    handleSelect,
    handleDelete,
  };
};
