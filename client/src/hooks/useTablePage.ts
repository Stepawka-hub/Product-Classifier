/* eslint-disable react-hooks/exhaustive-deps */
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk, TFetchEntitiesThunk } from "@thunks/types/types";
import { TPagination } from "@utils/types";
import { useEffect } from "react";
import { Selector } from "react-redux";
import { useModal } from "./useModal";
import { usePagination } from "./usePagination";
import { useTableActions } from "./useTableActions";

type TUseTableParams<T> = {
  headers: Record<keyof T, string>;
  dataSelector: (state: RootState) => T[];
  getIsLoadingSelector: (state: RootState) => boolean;
  getPaginationSelector: Selector<
    RootState,
    Omit<TPagination, "setCurrentPage">
  >;
  setCurrentPage: ActionCreatorWithPayload<number, string>;
  getElementsAsync: TFetchEntitiesThunk<T>;
  deleteElementAsync: TDeleteEntityThunk;
};

export const useTablePage = <T>({
  headers,
  getIsLoadingSelector,
  dataSelector,
  getPaginationSelector,
  setCurrentPage,
  getElementsAsync,
  deleteElementAsync,
}: TUseTableParams<T>) => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useModal();
  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getPaginationSelector,
    setCurrentPage
  );
  const { onEdit, onDelete } = useTableActions(deleteElementAsync);

  const data = useSelector(dataSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    dispatch(getElementsAsync({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize, dispatch]);

  return {
    isLoading,
    tableConfig: {
      headers,
      data,
      onEdit,
      onDelete,
    },
    modalConfig: {
      showModal,
      hideModal,
    },
    pagination: { ...pagination, setCurrentPage: setPageNumber },
  };
};
