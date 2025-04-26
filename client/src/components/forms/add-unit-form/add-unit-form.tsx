import { useAddForm } from "@hooks/useAddForm";
import { getIsAddingSelector } from "@slices/units";
import { addUnitAsync } from "@thunks/units";
import { AddUnitFormUI } from "@ui/forms";
import { FC, memo } from "react";
import { AddFormProps, TCreateUnitForm } from "../types/types";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getErrorMessage } from "@utils/error";

export const AddUnitForm: FC<AddFormProps> = memo(({ onClose }) => {
  const initialState: TCreateUnitForm = {
    name: "",
  };
  const { dispatch, formData, setFormData, handleChange, isAdding } =
    useAddForm<TCreateUnitForm>(getIsAddingSelector, initialState);

  const handleSubmit = async () => {
    try {
      await dispatch(
        addUnitAsync({
          name: formData.name,
        })
      ).unwrap();

      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
  };

  return (
    <AddUnitFormUI
      title="Добавление ЕИ"
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
});
