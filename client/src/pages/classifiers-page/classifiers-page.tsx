import { ClassifierRelations } from "@components/classifier-relations";
import { Button } from "@components/common/buttons";
import { Loader } from "@components/common/loader";
import {
  AddClassifierForm as AddForm,
  EditClassifierForm as EditForm,
} from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import {
  getClassifiersSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  getRemovingIdsSelector,
  setCurrentPage,
  setEditingItemId,
  setNodeCurrentPage,
  getSelectedItemIdSelector as getSelectedItemId,
  setSelectedItemId,
} from "@slices/classifiers";
import { deleteClassifierAsync, getAllClassifiersAsync } from "@thunks/classifiers";
import { classifiersHeaders as headers } from "@utils/constants";
import { TClassifier } from "@utils/types";
import { TablePage } from "../table-page";
import { TTableActions } from "@components/types";
import { TClassifierRealtionsTypes } from '@components/classifier-relations/type';

export const ClassifiersPage = () => {
  const { dispatch, data, isLoading, pagination } = useTableData<TClassifier>({
    dataSelector: getClassifiersSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllClassifiersAsync,
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
    deleteElementAsync: deleteClassifierAsync,
    openEditForm: showEditForm,
  });
  const isSelected = !!actions?.selection?.selectedItem;

  const showNodes = (type: TClassifierRealtionsTypes) => () => {
    const callback = () => {
      dispatch(setNodeCurrentPage(1));
    };
    showModal(<ClassifierRelations type={type} />, callback);
  };

  if (isLoading) return <Loader />;

  return (
    <TablePage<TClassifier>
      title="Классификаторы"
      addButtonLabel="Добавить классификатор"
      tableConfig={{ headers, data, actions }}
      pagination={pagination}
      openAddForm={showAddForm}
      additionalActions={
        <>
          <Button
            title={
              isSelected ? "Показать родительские узлы" : "Выберите строку"
            }
            variant="view"
            disabled={!isSelected}
            onClick={showNodes("parents")}
          >
            Родительские узлы
          </Button>
          <Button
            title={
              isSelected ? "Показать дочерние узлы" : "Выберите строку"
            }
            variant="view"
            disabled={!isSelected}
            onClick={showNodes("children")}
          >
            Дочерние узлы
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
