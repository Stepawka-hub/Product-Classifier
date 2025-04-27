import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/units";
import { useSelector } from "@store";
import { addUnitAsync } from "@thunks/units";
import { addBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC, memo } from "react";
import { FormProps, TCreateUnitForm } from "../../types";

export const AddUnitForm: FC<FormProps> = memo(({ onClose }) => {
  const initialState: TCreateUnitForm = {
    name: "",
  };
  const isAdding = useSelector(getIsAddingSelector);
  const { dispatch, formData, setFormData, onChange } =
    useForm<TCreateUnitForm>(initialState);

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
