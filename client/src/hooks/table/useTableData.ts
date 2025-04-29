/* eslint-disable react-hooks/exhaustive-deps */
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TFetchEntitiesThunk } from "@thunks/types/types";
import { PaginationParams } from "@utils/api/types/types";
import { TPagination } from "@utils/types";
import { useEffect } from "react";
import { Selector } from "react-redux";
import { usePagination } from "../usePagination";

type TUseTableDataParams<T, P> = {
  dataSelector: Selector<RootState, T[]>;
  getIsLoadingSelector: Selector<RootState, boolean>;
  getPaginationSelector: Selector<
    RootState,
    Omit<TPagination, "setCurrentPage">
  >;
  setCurrentPage: ActionCreatorWithPayload<number, string>;
  getElementsAsync: (params: P) => ReturnType<TFetchEntitiesThunk<T>>;
  additionalParams?: Omit<P, "page" | "limit">;
};

export const useTableData = <T, P extends PaginationParams = PaginationParams>({
  dataSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  setCurrentPage,
  getElementsAsync,
  additionalParams,
}: TUseTableDataParams<T, P>) => {
  const dispatch = useDispatch();
  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getPaginationSelector,
    setCurrentPage
  );
  const data = useSelector(dataSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: pageSize,
      ...additionalParams,
    } as P;
    console.log(params);

    dispatch(getElementsAsync(params));
  }, [dispatch, currentPage, pageSize]);

  return {
    isLoading,
    data,
    pagination: { ...pagination, setCurrentPage: setPageNumber },
  };
};
