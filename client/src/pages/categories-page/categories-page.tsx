import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
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

  const categories = useSelector(getCategoriesSelector);
  const pagination = useSelector(getPaginationSelector);
  const isLoading = useSelector(getIsLoadingSelector);
  const { currentPage, pageSize } = pagination;

  useEffect(() => {
    dispatch(
      getAllCategoriesAsync({
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize]);

  const setPageNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
