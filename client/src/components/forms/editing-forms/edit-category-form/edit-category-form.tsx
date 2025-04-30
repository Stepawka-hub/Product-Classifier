import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { Checkbox } from "@components/forms/form-elements/checkbox";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsUpdatingSelector } from "@slices/categories";
import { useSelector } from "@store";
import { updateCategoryAsync } from "@thunks/categories";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateCategoryForm } from "../../types";
import { getEditingCategorySelector } from "@selectors/categories";

export const EditCategoryForm: FC<FormProps> = ({ onClose }) => {
  const editingCategory = useSelector(getEditingCategorySelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const prefix = "category-edit";
  const needInheritInLeaves = true;
  const initialState: TUpdateCategoryForm = {
    name: editingCategory?.name || "",
    parentName: editingCategory?.parentName || "",
    unitName: needInheritInLeaves ? "" : editingCategory?.unitName || "",
    needInheritInLeaves,
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
          id={`${prefix}_name`}
          name="name"
          label="Название категории"
          value={formData.name}
          onChange={onChange("name")}
          maxLength={128}
          required
        />
        <Input
          id={`${prefix}_parentName`}
          name="parentName"
          label="Название родительской категории"
          value={formData.parentName}
          onChange={onChange("parentName")}
          maxLength={128}
        />
        <Checkbox
          id={`${prefix}_needInheritInLeaves`}
          name="needInheritInLeaves"
          label="Наследовать ЕИ?"
          type="checkbox"
          checked={formData.needInheritInLeaves}
          onChange={onChange("needInheritInLeaves")}
        />
        {!formData.needInheritInLeaves && (
          <Input
            id={`${prefix}_unitName`}
            name="unitName"
            label="Название ЕИ"
            value={formData.unitName}
            onChange={onChange("unitName")}
            maxLength={64}
          />
        )}
      </>
    </BaseForm>
  );
};
