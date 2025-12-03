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
    versionNumber: editingProduct?.versionNumber || 1,
    isActive: editingProduct?.isActive || true,
    dateCreated: editingProduct?.dateCreated || "",
    datePlanned: editingProduct?.datePlanned || "",
    dateActual: editingProduct?.dateActual || "",
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateProductForm>(initialState, [editingProduct]);

  if (!editingProduct) return null;

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateProductAsync({
          id: editingProduct.id,
          ...formData,
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
          id={`${prefix}_parentName`}
          name="parentName"
          label="Название категории"
          value={formData.parentName || ""}
          onChange={onChange("parentName")}
          maxLength={128}
          required
        />
        <Input
          id={`${prefix}_unitName`}
          name="unitName"
          label="Название ЕИ"
          value={formData.unitName || ""}
          onChange={onChange("unitName")}
          maxLength={64}
          required
        />
      </>
    </BaseForm>
  );
};
