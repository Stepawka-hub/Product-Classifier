import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
import { usePagination } from "@hooks/usePagination";
import {
  getCategoriesSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  setCurrentPage,
} from "@slices/categories";
import { useDispatch, useSelector } from "@store";
import { getAllCategoriesAsync } from "@thunks/categories";
import { CategoriesPageUI } from "@ui/pages";
import { useEffect } from "react";

export const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { showModal, handleShowModal, handleCloseModal } = useModal();
  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getPaginationSelector,
    setCurrentPage
  );
  const categories = useSelector(getCategoriesSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    dispatch(
      getAllCategoriesAsync({
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize]);

  if (isLoading) return <Loader />;

  return (
    <CategoriesPageUI
      categories={categories}
      showModal={showModal}
      pagination={{ ...pagination, setCurrentPage: setPageNumber }}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
