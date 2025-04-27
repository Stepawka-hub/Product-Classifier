import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { updateCategoryAsync } from "@thunks/categories";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateCategoryForm } from "../../types";
import { useSelector } from "@store";
import {
  getEditingItemSelector,
  getIsUpdatingSelector,
  setEditingItem,
} from "@slices/categories";

export const EditCategoryForm: FC<FormProps> = ({ onClose }) => {
  const editingCategory = useSelector(getEditingItemSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const initialState: TUpdateCategoryForm = {
    name: editingCategory?.name || "",
    parentName: editingCategory?.parentName || "",
    unitName: editingCategory?.unitName || "",
    needInheritInLeaves: false,
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateCategoryForm>(initialState, [editingCategory]);

  if (!editingCategory) return null;

  const handleSubmit = async () => {
    const { name, parentName, unitName, needInheritInLeaves } = formData;

    try {
      await dispatch(
        updateCategoryAsync({
          id: editingCategory.id,
          name,
          parentName,
          unitName,
          needInheritInLeaves,
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
      title="Обновление категории"
      btnLabel={editBtnLabel}
      isProgress={isUpdating}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <Input
          label="Название категории"
          value={formData.name}
          onChange={onChange("name")}
          maxLength={128}
          required
        />
        <Input
          label="Название родительской категории"
          value={formData.parentName}
          onChange={onChange("parentName")}
          maxLength={128}
        />
        <Input
          label="Название ЕИ"
          value={formData.unitName}
          onChange={onChange("unitName")}
          maxLength={64}
        />
        <Input
          label="Наследовать ЕИ?"
          type="checkbox"
          checked={formData.needInheritInLeaves}
          onChange={onChange("needInheritInLeaves")}
        />
      </>
    </BaseForm>
  );
};
