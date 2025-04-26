import { Input } from "@components/forms/form-elements";
import { useAddForm } from "@hooks/forms/useAddForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/units";
import { addUnitAsync } from "@thunks/units";
import { getErrorMessage } from "@utils/helpers/error";
import { FC, memo } from "react";
import { FormProps, TCreateUnitForm } from "../../types";
import { BaseForm } from "@components/forms/base-form";
import { addBtnLabel } from "@utils/constants";

export const AddUnitForm: FC<FormProps> = memo(({ onClose }) => {
  const initialState: TCreateUnitForm = {
    name: "",
  };
  const { dispatch, formData, setFormData, onChange, isAdding } =
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
    <BaseForm
      title="Добавление ЕИ"
      btnLabel={addBtnLabel}
      isProgress={isAdding}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        label="Название ЕИ"
        value={formData.name}
        onChange={onChange("name")}
        required
      />
    </BaseForm>
  );
});
