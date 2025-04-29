import { Loader } from "@components/common/loader";
import {
  AddProductForm as AddForm,
  EditProductForm as EditForm,
} from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import {
  getIsLoadingSelector,
  getRemovingIdsSelector,
  getPaginationSelector,
  getProductsSelector,
  setCurrentPage,
  setEditingItem,
} from "@slices/products";
import { deleteProductAsync, getAllProductsAsync } from "@thunks/products";
import { productsHeaders as headers } from "@utils/constants";
import { TProduct } from "@utils/types";
import { TablePage } from "../table-page";

export const ProductsPage = () => {
  const { data, isLoading, pagination } = useTableData<TProduct>({
    dataSelector: getProductsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllProductsAsync,
    setCurrentPage,
  });
  const { showAddForm, showEditForm } = useTableForms({ AddForm, EditForm });
  const actions = useTableActions({
    getRemovingIdsSelector,
    setEditingItem,
    deleteElementAsync: deleteProductAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  return (
    <TablePage<TProduct>
      title="Изделия"
      addButtonLabel="Добавить изделие"
      tableConfig={{ headers, data, actions }}
      openAddForm={showAddForm}
      pagination={pagination}
    />
  );
};
