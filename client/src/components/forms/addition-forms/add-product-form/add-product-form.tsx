import { Input } from "@components/forms/form-elements";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/products";
import { addProductAsync } from "@thunks/products";
import { getErrorMessage } from "@utils/helpers/error";
import { getNumber } from "@utils/helpers/validation";
import { FC } from "react";
import { FormProps, TCreateProductForm } from "../../types";
import { BaseForm } from "@components/forms/base-form";
import { addBtnLabel } from "@utils/constants";
import { useForm } from "@hooks/forms/useForm";
import { useSelector } from "@store";

export const AddProductForm: FC<FormProps> = ({ onClose }) => {
  const prefix = "product-add";
  const initialState: TCreateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
  };

  const isAdding = useSelector(getIsAddingSelector);
  const { dispatch, formData, setFormData, onChange } =
    useForm<TCreateProductForm>(initialState);

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
          id={`${prefix}_name`}
          name="name"
          label="Название изделия"
          value={formData.name}
          onChange={onChange("name")}
          maxLength={128}
          required
        />
        <Input
          id={`${prefix}_parentId`}
          name="parentId"
          label="ID категории"
          value={formData.parentId}
          onChange={onChange("parentId")}
          type="number"
          maxLength={32}
          required
        />
        <Input
          id={`${prefix}_unitId`}
          name="unitId"
          label="ID ЕИ"
          value={formData.unitId}
          onChange={onChange("unitId")}
          type="number"
          maxLength={32}
          required
        />
      </>
    </BaseForm>
  );
};
