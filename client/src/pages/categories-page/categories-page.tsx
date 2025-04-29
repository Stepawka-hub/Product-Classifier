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
  getRemovingIdsSelector,
  getPaginationSelector,
  setCurrentPage,
  setEditingItem,
} from "@slices/categories";
import { useDispatch } from "@store";
import {
  deleteCategoryAsync,
  getAllCategoriesAsync,
  getChildCategoriesAsync,
  getParentCategoriesAsync,
} from "@thunks/categories";
import { categoriesHeaders as headers } from "@utils/constants";
import { TCategory } from "@utils/types";
import { TablePage } from "../table-page";

export const CategoriesPage = () => {
  const dispatch = useDispatch();
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

  if (isLoading) return <Loader />;

  return (
    <TablePage<TCategory>
      title="Категории"
      addButtonLabel="Добавить категорию"
      tableConfig={{ headers, data, ...actions }}
      pagination={pagination}
      openAddForm={showAddForm}
      additionalActions={
        <>
          <Button
            variant="view"
            onClick={async () =>
              console.log(
                await dispatch(
                  getParentCategoriesAsync({ id: 4, page: 1, limit: 10 })
                )
              )
            }
          >
            Родительские категории
          </Button>
          <Button
            variant="view"
            onClick={async () =>
              console.log(
                await dispatch(
                  getChildCategoriesAsync({ id: 4, page: 1, limit: 10 })
                )
              )
            }
          >
            Дочерние категории
          </Button>
        </>
      }
    />
  );
};
