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
  setEditingItemId,
} from "@slices/products";
import { deleteProductAsync, getAllProductsAsync } from "@thunks/products";
import { productsHeaders as headers } from "@utils/constants";
import { TProduct } from "@utils/types";
import { TablePage } from "../table-page";
import { TTableActions } from "@components/types";

export const ProductsPage = () => {
  const { data, isLoading, pagination } = useTableData<TProduct>({
    dataSelector: getProductsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllProductsAsync,
    setCurrentPage,
  });
  const { showAddForm, showEditForm } = useTableForms({ AddForm, EditForm });
  const actions: TTableActions<TProduct> = useTableActions({
    setEditingItemId,
    getRemovingIdsSelector,
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
