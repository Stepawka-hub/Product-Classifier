import { Loader } from "@components/common/loader";
import { AddCategoryForm } from "@components/forms";
import { useTablePage } from "@hooks/useTablePage";
import {
  getCategoriesSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  setCurrentPage,
} from "@slices/categories";
import { deleteCategoryAsync, getAllCategoriesAsync } from "@thunks/categories";
import { CategoriesPageUI } from "@ui/pages";
import { categoriesHeaders } from "@utils/constants";
import { TCategory } from "@utils/types";
import { useMemo } from "react";

export const CategoriesPage = () => {
  const { isLoading, tableConfig, modalConfig, pagination } =
    useTablePage<TCategory>({
      headers: categoriesHeaders,
      dataSelector: getCategoriesSelector,
      getIsLoadingSelector,
      getPaginationSelector,
      setCurrentPage,
      getElementsAsync: getAllCategoriesAsync,
      deleteElementAsync: deleteCategoryAsync,
    });
  const { showModal, hideModal } = modalConfig;

  const modalContent = useMemo(
    () => <AddCategoryForm onClose={hideModal} />,
    [hideModal]
  );

  if (isLoading) return <Loader />;

  return (
    <CategoriesPageUI
      tableConfig={tableConfig}
      openModal={() => showModal(modalContent)}
      pagination={pagination}
    />
  );
};
