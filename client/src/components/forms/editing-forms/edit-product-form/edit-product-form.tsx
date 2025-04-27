import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { updateProductAsync } from "@thunks/products";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateProductForm } from "../../types";

export const EditProductForm: FC<FormProps> = ({ onClose }) => {
  const initialState: TUpdateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateProductForm>(initialState);

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateProductAsync({
          id: 1,
          name: formData.name,
          parentId: Number(formData.parentId),
          unitId: Number(formData.unitId),
        })
      ).unwrap();

      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
  };

  return (
    <BaseForm
      title="Обновление изделия"
      btnLabel={editBtnLabel}
      isProgress={true}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <Input
          label="Название изделия"
          value={formData.name}
          onChange={onChange("name")}
          required
        />
        <Input
          label="ID категории"
          value={formData.parentId}
          onChange={onChange("parentId")}
          required
        />
        <Input
          label="ID ЕИ"
          value={formData.unitId}
          onChange={onChange("unitId")}
          required
        />
      </>
    </BaseForm>
  );
};
