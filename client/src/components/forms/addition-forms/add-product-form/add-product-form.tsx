import { FC } from "react";

import { useSelector } from "@store";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/products";
import { addProductAsync } from "@thunks/products";
import { useForm } from "@hooks/forms/useForm";
import { getErrorMessage } from "@utils/helpers/error";
import { getNumber } from "@utils/helpers/validation";
import { addBtnLabel } from "@utils/constants";
import { Input } from "@components/forms/form-elements";
import { BaseForm } from "@components/forms/base-form";
import { FormProps, TCreateProductForm } from "../../types";

export const AddProductForm: FC<FormProps> = ({ onClose }) => {
  const prefix = "product-add";
  const initialState: TCreateProductForm = {
    name: "",
    parentId: "",
    unitId: "",
    classifierId: "",
    baseProductId: "",
  };

  const isAdding = useSelector(getIsAddingSelector);
  const { dispatch, formData, setFormData, onChange } =
    useForm<TCreateProductForm>(initialState);

  const handleSubmit = async () => {
    const { name, parentId, unitId, baseProductId, classifierId } = formData;

    try {
      await dispatch(
        addProductAsync({
          name,
          parentId: parentId ? getNumber(parentId) : null,
          unitId: unitId ? getNumber(unitId) : null,
          baseProductId: baseProductId ? getNumber(baseProductId) : null,
          classifierId: classifierId ? getNumber(classifierId) : null,
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
        type="number"
        name="parentId"
        label="ID категории"
        value={formData.parentId}
        onChange={onChange("parentId")}
        maxLength={32}
      />
      <Input
        id={`${prefix}_unitId`}
        type="number"
        name="unitId"
        label="ID ЕИ"
        value={formData.unitId}
        onChange={onChange("unitId")}
        maxLength={32}
      />
      <Input
        id={`${prefix}_baseProductId`}
        type="number"
        name="baseProductId"
        label="ID базового изделия"
        value={formData.baseProductId}
        onChange={onChange("baseProductId")}
        maxLength={32}
      />
      <Input
        id={`${prefix}_classifierId`}
        type="number"
        name="classifierId"
        label="ID классификатора"
        value={formData.classifierId}
        onChange={onChange("classifierId")}
        maxLength={32}
      />
    </BaseForm>
  );
};
