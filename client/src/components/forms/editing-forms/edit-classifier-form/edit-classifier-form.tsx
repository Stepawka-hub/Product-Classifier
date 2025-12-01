import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { Checkbox } from "@components/forms/form-elements/checkbox";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsUpdatingSelector } from "@slices/classifiers";
import { useSelector } from "@store";
import { updateClassifierAsync } from "@thunks/classifiers";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateClassifierForm } from "../../types";
import { getEditingClassifierSelector } from "@selectors/classifiers";

export const EditClassifierForm: FC<FormProps> = ({ onClose }) => {
  const editingClassifier = useSelector(getEditingClassifierSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const prefix = "classifier-edit";
  const initialState: TUpdateClassifierForm = {
    name: editingClassifier?.name || "",
    parentName: editingClassifier?.parentName || "",
    unitName: editingClassifier?.unitName || "",
    needInheritInLeaves: false,
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateClassifierForm>(initialState, [editingClassifier]);

  if (!editingClassifier) return null;

  const handleSubmit = async () => {
    const { name, parentName, unitName, needInheritInLeaves } = formData;

    try {
      await dispatch(
        updateClassifierAsync({
          id: editingClassifier.id,
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
      title="Обновление классификатора"
      btnLabel={editBtnLabel}
      isProgress={isUpdating}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <Input
          id={`${prefix}_name`}
          name="name"
          label="Название классификатора"
          value={formData.name}
          onChange={onChange("name")}
          maxLength={128}
          required
        />
        <Input
          id={`${prefix}_parentName`}
          name="parentName"
          label="Название родительского классификатора"
          value={formData.parentName}
          onChange={onChange("parentName")}
          maxLength={128}
        />
        <Input
          id={`${prefix}_unitName`}
          name="unitName"
          label="Название ЕИ"
          value={formData.unitName}
          onChange={onChange("unitName")}
          maxLength={64}
        />
        <Checkbox
          id={`${prefix}_needInheritInLeaves`}
          name="needInheritInLeaves"
          label="Должны ли изделия наследовать ЕИ?"
          type="checkbox"
          checked={formData.needInheritInLeaves}
          onChange={onChange("needInheritInLeaves")}
        />
      </>
    </BaseForm>
  );
};
