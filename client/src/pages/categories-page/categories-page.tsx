import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
import {
  getCategoriesSelector,
  getIsLoadingSelector,
} from "@slices/categories";
import { useDispatch, useSelector } from "@store";
import { getAllCategoriesAsync } from "@thunks/categories";
import { CategoriesPageUI } from "@ui/pages";
import { useEffect } from "react";

export const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesSelector);
  const isLoading = useSelector(getIsLoadingSelector);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <CategoriesPageUI
      categories={categories}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
