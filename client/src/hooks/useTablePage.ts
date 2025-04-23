/* eslint-disable react-hooks/exhaustive-deps */
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk, TFetchEntitiesThunk } from "@thunks/types/types";
import { TPagination } from "@utils/types";
import { useEffect } from "react";
import { Selector } from "react-redux";
import { useModal } from "./useModal";

export const useTablePage = <T>(
  headers: Record<keyof T, string>,
  dataSelector: (state: RootState) => T[],
  isLoadingSelector: (state: RootState) => boolean,
  getPaginationSelector: Selector<
    RootState,
    Omit<TPagination, "setCurrentPage">
  >,
  setCurrentPage: ActionCreatorWithPayload<number, string>,
  getElementsAsync: TFetchEntitiesThunk<T>,
  deleteElementAsync: TDeleteEntityThunk
) => {
  const dispatch = useDispatch();
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  const pagination = useSelector(getPaginationSelector);
  const { currentPage, pageSize } = pagination;

  const data = useSelector(dataSelector);
  const isLoading = useSelector(isLoadingSelector);

  const setPageNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleEdit = () => {};

  const handleDelete = (id: number) => {
    dispatch(deleteElementAsync(id))
  };

  useEffect(() => {
    dispatch(getElementsAsync({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize, dispatch]);

  return {
    isLoading,
    tableConfig: {
      headers: headers,
      data: data,
      onEdit: handleEdit,
      onDelete: handleDelete,
    },
    modalConfig: {
      isOpen: showModal,
      onOpen: handleShowModal,
      onClose: handleCloseModal,
    },
    pagination: { ...pagination, setCurrentPage: setPageNumber },
  };
};
