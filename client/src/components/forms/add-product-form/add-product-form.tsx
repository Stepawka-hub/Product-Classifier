import { useAddForm } from "@hooks/useAddForm";
import { getIsAddingSelector } from "@slices/products";
import { addProductAsync } from "@thunks/products";
import { AddProductFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps, TCreateProductForm } from "../types/types";
import { getNumber } from "@utils/validation";

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const initialState: TCreateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateProductForm>(getIsAddingSelector, initialState);

  const handleSubmit = () => {
    const { name, parentId, unitId } = formData;

    dispatch(
      addProductAsync({
        name,
        parentId: getNumber(parentId),
        unitId: getNumber(unitId),
      })
    );

    setFormData(initialState);
  };

  return (
    <AddProductFormUI
      title="Добавление изделия"
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
