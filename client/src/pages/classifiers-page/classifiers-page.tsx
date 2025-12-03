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
  setCurrentPage,
  setNodeCurrentPage,
  getSelectedItemIdSelector as getSelectedItemId,
  setSelectedItemId,
  getIsUpdatingSelector,
  getIsRemovingSelector,
} from "@slices/classifiers";
import {
  deleteClassifierAsync,
  getAllClassifiersAsync,
} from "@thunks/classifiers";
import { classifiersHeaders as headers } from "@utils/constants";
import { TClassifier } from "@utils/types";
import { TablePage } from "@ui/pages";
import { TClassifierRealtionsTypes } from "@components/classifier-relations/type";
import { useSelector } from "@store";
import { BaseTableActions } from "@components/base-table-actions";
import { getIsAddingSelector } from "@slices/products";

export const ClassifiersPage = () => {
  const isAdding = useSelector(getIsAddingSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);
  const isRemoving = useSelector(getIsRemovingSelector);

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

  const { selectedItemId, handleSelect, handleDelete } = useTableActions({
    getSelectedItemId,
    setSelectedItemId,
    deleteElementAsync: deleteClassifierAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  const isSelected = selectedItemId !== null;

  const showNodes = (type: TClassifierRealtionsTypes) => () => {
    const callback = () => {
      dispatch(setNodeCurrentPage(1));
    };
    showModal(<ClassifierRelations type={type} />, callback);
  };

  return (
    <TablePage<TClassifier>
      title="Классификаторы"
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
      footerActions={
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
            title={isSelected ? "Показать дочерние узлы" : "Выберите строку"}
            variant="view"
            disabled={!isSelected}
            onClick={showNodes("children")}
          >
            Дочерние узлы
          </Button>
          <Button
            title={isSelected ? "Показать изделия (листья)" : "Выберите строку"}
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
