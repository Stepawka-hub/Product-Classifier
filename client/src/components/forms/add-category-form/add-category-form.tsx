import { getIsAddingSelector } from "@slices/categories";
import { AddCategoryFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps, TCreateCategoryForm } from "../types/types";
import { useAddForm } from "@hooks/useAddForm";
import { addCategoryAsync } from "@thunks/categories";

export const AddCategoryForm: FC<AddFormProps> = ({ onClose }) => {
  const initialState: TCreateCategoryForm = {
    name: "",
    parentName: "",
    unitName: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateCategoryForm>(getIsAddingSelector, initialState);

  const handleSubmit = () => {
    dispatch(
      addCategoryAsync({
        name: formData.name,
        parentName: formData.parentName,
        unitName: formData.unitName,
      })
    );

    setFormData(initialState);
  };

  return (
    <AddCategoryFormUI
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
