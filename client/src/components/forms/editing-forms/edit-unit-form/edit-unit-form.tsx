import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { updateUnitAsync } from "@thunks/units";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateUnitForm } from "../../types";

export const EditUnitForm: FC<FormProps> = ({ onClose }) => {
  const initialState: TUpdateUnitForm = {
    name: "",
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateUnitForm>(initialState);

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateUnitAsync({
          id: 1,
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
      title="Обновление ЕИ"
      btnLabel={editBtnLabel}
      isProgress={true}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <Input
          label="Название ЕИ"
          value={formData.name}
          onChange={onChange("name")}
          required
        />
      </>
    </BaseForm>
  );
};
