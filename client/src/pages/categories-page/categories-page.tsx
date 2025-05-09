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
  setCurrentPage,
  setEditingItemId,
  setNodeCurrentPage,
  getSelectedItemIdSelector as getSelectedItemId,
  setSelectedItemId,
} from "@slices/categories";
import { deleteCategoryAsync, getAllCategoriesAsync } from "@thunks/categories";
import { categoriesHeaders as headers } from "@utils/constants";
import { TCategory } from "@utils/types";
import { TablePage } from "../table-page";
import { TTableActions } from "@components/types";
import { TCategoryRealtionsTypes } from '@components/category-relations/type';

export const CategoriesPage = () => {
  const { dispatch, data, isLoading, pagination } = useTableData<TCategory>({
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
  const actions: TTableActions = useTableActions({
    setEditingItemId,
    setSelectedItemId,
    getSelectedItemId,
    getRemovingIdsSelector,
    deleteElementAsync: deleteCategoryAsync,
    openEditForm: showEditForm,
  });
  const isSelected = !!actions?.selection?.selectedItem;

  const showNodes = (type: TCategoryRealtionsTypes) => () => {
    const callback = () => {
      dispatch(setNodeCurrentPage(1));
    };
    showModal(<CategoryRelations type={type} />, callback);
  };

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
            title={
              isSelected ? "Показать родительские категории" : "Выберите строку"
            }
            variant="view"
            disabled={!isSelected}
            onClick={showNodes("parents")}
          >
            Родительские категории
          </Button>
          <Button
            title={
              isSelected ? "Показать дочерние категории" : "Выберите строку"
            }
            variant="view"
            disabled={!isSelected}
            onClick={showNodes("children")}
          >
            Дочерние категории
          </Button>
          <Button
            title={
              isSelected ? "Показать изделия (листья)" : "Выберите строку"
            }
            variant="view"
            disabled={!isSelected}
            onClick={showNodes("leaves")}
          >
            Изделия (Листья)
          </Button>
        </>
      }
    />
  );
};
