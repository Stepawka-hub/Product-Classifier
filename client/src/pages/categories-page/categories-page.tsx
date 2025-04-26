import { Loader } from "@components/common/loader";
import { AddCategoryForm } from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useModal } from "@hooks/useModal";
import {
  getCategoriesSelector,
  getIsLoadingSelector,
  getIsRemovingSelector,
  getPaginationSelector,
  setCurrentPage,
} from "@slices/categories";
import { deleteCategoryAsync, getAllCategoriesAsync } from "@thunks/categories";
import { categoriesHeaders as headers } from "@utils/constants";
import { TCategory } from "@utils/types";
import { useMemo } from "react";
import { TablePage } from "../table-page";

export const CategoriesPage = () => {
  const { data, isLoading, pagination } = useTableData<TCategory>({
    dataSelector: getCategoriesSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllCategoriesAsync,
    setCurrentPage,
  });
  const actions = useTableActions({
    deleteElementAsync: deleteCategoryAsync,
    getIsRemovingSelector,
  });
  const { showModal, hideModal } = useModal();

  const modalContent = useMemo(
    () => <AddCategoryForm onClose={hideModal} />,
    [hideModal]
  );

  if (isLoading) return <Loader />;

  return (
    <TablePage<TCategory>
      title="Категории"
      addButtonLabel="Добавить категорию"
      tableConfig={{ headers, data, ...actions }}
      openModal={() => showModal(modalContent)}
      pagination={pagination}
    />
  );
};
