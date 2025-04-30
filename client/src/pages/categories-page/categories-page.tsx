import { CategoryRelations } from "@components/category-relations/category-relations";
import { Button } from "@components/common/buttons";
import { Loader } from "@components/common/loader";
import {
  AddCategoryForm as AddForm,
  EditCategoryForm as EditForm,
} from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import {
  getCategoriesSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  getRemovingIdsSelector,
  getSelectedItemSelector as getSelectedItem,
  setCurrentPage,
  setEditingItem,
  setSelectedItem,
} from "@slices/categories";
import { deleteCategoryAsync, getAllCategoriesAsync } from "@thunks/categories";
import { categoriesHeaders as headers } from "@utils/constants";
import { TCategory } from "@utils/types";
import { TablePage } from "../table-page";
import { TTableActions } from "@components/types";

export const CategoriesPage = () => {
  const { data, isLoading, pagination } = useTableData<TCategory>({
    dataSelector: getCategoriesSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllCategoriesAsync,
    setCurrentPage,
  });

  const { showModal, showAddForm, showEditForm } = useTableForms({
    AddForm,
    EditForm,
  });

  const actions: TTableActions<TCategory> = useTableActions({
    setEditingItem,
    setSelectedItem,
    getSelectedItem,
    getRemovingIdsSelector,
    deleteElementAsync: deleteCategoryAsync,
    openEditForm: showEditForm,
  });

  const isSelected = !!actions?.selection?.selectedItem;

  if (isLoading) return <Loader />;

  return (
    <TablePage<TCategory>
      title="Категории"
      addButtonLabel="Добавить категорию"
      tableConfig={{ headers, data, actions }}
      pagination={pagination}
      openAddForm={showAddForm}
      additionalActions={
        <>
          <Button
            variant="view"
            disabled={!isSelected}
            onClick={() => showModal(<CategoryRelations type="parents" />)}
          >
            Родительские категории
          </Button>
          <Button
            variant="view"
            disabled={!isSelected}
            onClick={() => showModal(<CategoryRelations type="children" />)}
          >
            Дочерние категории
          </Button>
        </>
      }
    />
  );
};
