import { useAddForm } from "@hooks/useAddForm";
import { getIsAddingSelector } from "@slices/products";
import { addProductAsync } from "@thunks/products";
import { AddProductFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps, TCreateProductForm } from "../types/types";

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const initialState: TCreateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateProductForm>(getIsAddingSelector, initialState);

  const handleSubmit = () => {
    dispatch(
      addProductAsync({
        name: formData.name,
        parentId: Number(formData.parentId),
        unitId: Number(formData.unitId),
      })
    );

    setFormData(initialState);
  };

  return (
    <AddProductFormUI
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
