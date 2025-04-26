import { useAddForm } from "@hooks/useAddForm";
import { getIsAddingSelector } from "@slices/products";
import { addProductAsync } from "@thunks/products";
import { AddProductFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps, TCreateProductForm } from "../types/types";
import { getNumber } from "@utils/helpers/validation";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getErrorMessage } from '@utils/helpers/error';

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const initialState: TCreateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateProductForm>(getIsAddingSelector, initialState);

  const handleSubmit = async () => {
    const { name, parentId, unitId } = formData;

    try {
      await dispatch(
        addProductAsync({
          name,
          parentId: getNumber(parentId),
          unitId: getNumber(unitId),
        })
      ).unwrap();

      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
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
