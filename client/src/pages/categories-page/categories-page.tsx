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

export const CategoriesPage = () => {
  const { isLoading, tableConfig, modalConfig, pagination } =
    useTablePage<TCategory>(
      categoriesHeaders,
      getCategoriesSelector,
      getIsLoadingSelector,
      getPaginationSelector,
      setCurrentPage,
      getAllCategoriesAsync,
      deleteCategoryAsync
    );

  if (isLoading) return <Loader />;

  return (
    <CategoriesPageUI
      tableConfig={tableConfig}
      modalConfig={{
        renderModal: <AddCategoryForm onClose={modalConfig.onClose} />,
        ...modalConfig,
      }}
      pagination={pagination}
    />
  );
};
