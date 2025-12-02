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
import {
  deleteClassifierAsync,
  getAllClassifiersAsync,
} from "@thunks/classifiers";
import { classifiersHeaders as headers } from "@utils/constants";
import { TClassifier } from "@utils/types";
import { TablePage } from "@ui/pages";
import { TClassifierRealtionsTypes } from "@components/classifier-relations/type";

// {onEdit && (
//   <Button
//     title="Редактировать"
//     variant="edit"
//     size="small"
//     onClick={handleEdit}
//   />
// )}

// {deletion && (
//   <Button
//     title="Удалить"
//     variant="cross"
//     size="small"
//     disabled={isRemoving}
//     onClick={handleDelete}
//   />
// )}

// <div className={s.actions}>
//   <Button
//     variant="plus"
//     children={addButtonLabel}
//     onClick={openAddForm}
//   />
//   {additionalActions}
// </div>

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
  const actions = useTableActions({
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
      tableConfig={{ headers, data, actions }}
      pagination={pagination}
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
