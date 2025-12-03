import { Loader } from "@components/common/loader";
import {
  AddProductForm as AddForm,
  EditProductForm as EditForm,
} from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import {
  getIsAddingSelector,
  getIsLoadingSelector,
  getIsRemovingSelector,
  getIsUpdatingSelector,
  getPaginationSelector,
  getProductsSelector,
  getSelectedItemIdSelector as getSelectedItemId,
  setCurrentPage,
  setSelectedItemId,
} from "@slices/products";
import { deleteProductAsync, getAllProductsAsync } from "@thunks/products";
import { productsHeaders as headers } from "@utils/constants";
import { TProduct } from "@utils/types";
import { TablePage } from "@ui/pages";
import { useSelector } from "@store";
import { BaseTableActions } from "@components/base-table-actions";

export const ProductsPage = () => {
  const isAdding = useSelector(getIsAddingSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);
  const isRemoving = useSelector(getIsRemovingSelector);

  const { data, isLoading, pagination } = useTableData<TProduct>({
    dataSelector: getProductsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllProductsAsync,
    setCurrentPage,
  });

  const { showAddForm, showEditForm } = useTableForms({ AddForm, EditForm });

  const { selectedItemId, handleSelect, handleDelete } = useTableActions({
    getSelectedItemId,
    setSelectedItemId,
    deleteElementAsync: deleteProductAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  const isSelected = selectedItemId !== null;

  return (
    <TablePage<TProduct>
      title="Изделия"
      tableConfig={{ headers, data }}
      pagination={pagination}
      selectedItemId={selectedItemId}
      setSelectedItem={handleSelect}
      headerActions={
        <BaseTableActions
          isAdding={isAdding}
          isUpdating={isUpdating}
          isRemoving={isRemoving}
          isSelected={isSelected}
          onAddButtonClick={showAddForm}
          onEditButtonClick={showEditForm}
          onDeleteButtonClick={handleDelete}
        />
      }
    />
  );
};
