import { FC } from "react";

import { useSelector } from "@store";
import { updateProductAsync } from "@thunks/products";
import { getSelectedProductSelector } from "@selectors/products";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsUpdatingSelector } from "@slices/products";

import { useForm } from "@hooks/forms/useForm";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";

import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { FormProps, TUpdateProductForm } from "../../types";

export const EditProductForm: FC<FormProps> = ({ onClose }) => {
  const editingProduct = useSelector(getSelectedProductSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const prefix = "product-edit";
  const initialState: TUpdateProductForm = {
    name: editingProduct?.name || "",
    parentName: editingProduct?.parentName || "",
    unitName: editingProduct?.unitName || "",
    classifierName: editingProduct?.classifierName || "",
    baseProductName: editingProduct?.baseProductName || "",
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateProductForm>(initialState, [editingProduct]);

  if (!editingProduct) return null;

  const handleSubmit = async () => {
    const { name, parentName, unitName, classifierName, baseProductName } =
      formData;
    try {
      await dispatch(
        updateProductAsync({
          ...editingProduct,
          name,
          parentName: parentName || null,
          unitName: unitName || null,
          classifierName: classifierName || null,
          baseProductName: baseProductName || null,
        })
      ).unwrap();

      onClose();
      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
  };

  return (
    <BaseForm
      title="Обновление изделия"
      btnLabel={editBtnLabel}
      isProgress={isUpdating}
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
        id={`${prefix}_parentName`}
        name="parentName"
        label="Название родительского изделия"
        value={formData.parentName || ""}
        onChange={onChange("parentName")}
        maxLength={128}
      />
      <Input
        id={`${prefix}_unitName`}
        name="unitName"
        label="Название ЕИ"
        value={formData.unitName || ""}
        onChange={onChange("unitName")}
        maxLength={64}
      />
      <Input
        id={`${prefix}_baseProductName`}
        name="baseProductName"
        label="Название базового изделия"
        value={formData.baseProductName || ""}
        onChange={onChange("baseProductName")}
        maxLength={64}
      />
      <Input
        id={`${prefix}_classifierName`}
        name="classifierName"
        label="Название классификатора"
        value={formData.classifierName || ""}
        onChange={onChange("classifierName")}
        maxLength={64}
      />
    </BaseForm>
  );
};
