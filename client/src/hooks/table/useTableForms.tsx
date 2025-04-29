import { FormProps } from "@components/forms/types";
import { useModal } from "@hooks/useModal";
import { FC, useMemo } from "react";

type TUseTableForms = {
  AddForm: FC<FormProps>;
  EditForm: FC<FormProps>;
};

export const useTableForms = ({ AddForm, EditForm }: TUseTableForms) => {
  const { showModal, hideModal } = useModal();

  const addForm = useMemo(
    () => <AddForm onClose={hideModal} />,
    [hideModal, AddForm]
  );

  const editForm = useMemo(
    () => <EditForm onClose={hideModal} />,
    [hideModal, EditForm]
  );

  return {
    showAddForm: () => showModal(addForm),
    showEditForm: () => showModal(editForm),
  };
};
