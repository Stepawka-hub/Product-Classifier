import { useAddForm } from "@hooks/useAddForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/categories";
import { addCategoryAsync } from "@thunks/categories";
import { AddCategoryFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps, TCreateCategoryForm } from "../types/types";
import { getErrorMessage } from "@utils/error";

export const AddCategoryForm: FC<AddFormProps> = ({ onClose }) => {
  const initialState: TCreateCategoryForm = {
    name: "",
    parentName: "",
    unitName: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateCategoryForm>(getIsAddingSelector, initialState);

  const handleSubmit = async () => {
    try {
      await dispatch(
        addCategoryAsync({
          name: formData.name,
          parentName: formData.parentName,
          unitName: formData.unitName,
        })
      ).unwrap();

      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
  };

  return (
    <AddCategoryFormUI
      title="Добавление категории"
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
