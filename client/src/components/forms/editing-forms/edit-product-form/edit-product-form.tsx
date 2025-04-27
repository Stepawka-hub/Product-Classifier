import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { updateProductAsync } from "@thunks/products";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateProductForm } from "../../types";
import {
  getEditingItemSelector,
  getIsUpdatingSelector,
  setEditingItem,
} from "@slices/products";
import { useSelector } from "@store";

export const EditProductForm: FC<FormProps> = ({ onClose }) => {
  const editingProduct = useSelector(getEditingItemSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const initialState: TUpdateProductForm = {
    name: editingProduct?.name || "",
    parentName: editingProduct?.parentName || "",
    unitName: editingProduct?.unitName || "",
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateProductForm>(initialState, [editingProduct]);

  if (!editingProduct) return null;

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateProductAsync({
          id: editingProduct.id,
          name: formData.name,
          parentName: formData.parentName,
          unitName: formData.unitName,
        })
      ).unwrap();

      onClose();
      dispatch(setEditingItem(null));
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
          label="Название изделия"
          value={formData.name}
          onChange={onChange("name")}
          maxLength={128}
          required
        />
        <Input
          label="Название категории"
          value={formData.parentName}
          onChange={onChange("parentName")}
          maxLength={128}
          required
        />
        <Input
          label="Название ЕИ"
          value={formData.unitName}
          onChange={onChange("unitName")}
          maxLength={64}
          required
        />
      </>
    </BaseForm>
  );
};
