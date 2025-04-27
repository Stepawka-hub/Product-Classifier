import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { updateCategoryAsync } from "@thunks/categories";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateCategoryForm } from "../../types";

export const EditCategoryForm: FC<FormProps> = ({ onClose }) => {
  const initialState: TUpdateCategoryForm = {
    name: "",
    parentName: "",
    unitName: "",
    needInheritInLeaves: false,
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateCategoryForm>(initialState);

  const handleSubmit = async () => {
    const { name, parentName, unitName, needInheritInLeaves } = formData;

    try {
      await dispatch(
        updateCategoryAsync({
          id: 1,
          name,
          parentName,
          unitName,
          needInheritInLeaves,
        })
      ).unwrap();

      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
  };

  return (
    <BaseForm
      title="Обновление категории"
      btnLabel={editBtnLabel}
      isProgress={true}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <Input
          label="Название категории"
          value={formData.name}
          onChange={onChange("name")}
          required
        />
        <Input
          label="Название родительской категории"
          value={formData.parentName}
          onChange={onChange("parentName")}
        />
        <Input
          label="Название ЕИ"
          value={formData.unitName}
          onChange={onChange("unitName")}
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
