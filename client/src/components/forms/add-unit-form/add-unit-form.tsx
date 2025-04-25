import { useAddForm } from "@hooks/useAddForm";
import { getIsAddingSelector } from "@slices/units";
import { addUnitAsync } from "@thunks/units";
import { AddUnitFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps, TCreateUnitForm } from "../types/types";

export const AddUnitForm: FC<AddFormProps> = ({ onClose }) => {
  const initialState: TCreateUnitForm = {
    name: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateUnitForm>(getIsAddingSelector, initialState);

  const handleSubmit = () => {
    dispatch(
      addUnitAsync({
        name: formData.name,
      })
    );

    setFormData(initialState);
  };

  return (
    <AddUnitFormUI
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
