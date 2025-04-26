import { Input } from "@components/forms/form-elements";
import { useAddForm } from "@hooks/forms/useAddForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/products";
import { addProductAsync } from "@thunks/products";
import { getErrorMessage } from "@utils/helpers/error";
import { getNumber } from "@utils/helpers/validation";
import { FC } from "react";
import { FormProps, TCreateProductForm } from "../../types";
import { BaseForm } from "@components/forms/base-form";
import { addBtnLabel } from "@utils/constants";

export const AddProductForm: FC<FormProps> = ({ onClose }) => {
  const initialState: TCreateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
  };
  const { dispatch, formData, setFormData, onChange, isAdding } =
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
    <BaseForm
      title="Добавление изделия"
      btnLabel={addBtnLabel}
      isProgress={isAdding}
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
          type="number"
          required
        />
        <Input
          label="ID ЕИ"
          value={formData.unitId}
          onChange={onChange("unitId")}
          type="number"
          required
        />
      </>
    </BaseForm>
  );
};
