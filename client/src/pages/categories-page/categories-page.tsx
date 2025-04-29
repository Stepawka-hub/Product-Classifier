import { Button } from "@components/common/buttons";
import { Loader } from "@components/common/loader";
import {
  AddCategoryForm as AddForm,
  EditCategoryForm as EditForm,
} from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import { useModal } from "@hooks/useModal";
import {
  getCategoriesSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  getRemovingIdsSelector,
  setCurrentPage,
  setEditingItem,
} from "@slices/categories";
import { deleteCategoryAsync, getAllCategoriesAsync } from "@thunks/categories";
import { categoriesHeaders as headers } from "@utils/constants";
import { TCategory } from "@utils/types";
import { TablePage } from "../table-page";
import { CategoryRelations } from "@components/category-relations-modal/category-relations";

export const CategoriesPage = () => {
  const { data, isLoading, pagination } = useTableData<TCategory>({
    dataSelector: getCategoriesSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllCategoriesAsync,
    setCurrentPage,
  });
  const { showAddForm, showEditForm } = useTableForms({ AddForm, EditForm });
  const actions = useTableActions({
    getRemovingIdsSelector,
    setEditingItem,
    deleteElementAsync: deleteCategoryAsync,
    openEditForm: showEditForm,
  });
  const { showModal } = useModal();

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
            onClick={() => showModal(<CategoryRelations type="parents" />)}
          >
            Родительские категории
          </Button>
          <Button
            variant="view"
            onClick={() => showModal(<CategoryRelations type="children" />)}
          >
            Дочерние категории
          </Button>
        </>
      }
    />
  );
};
