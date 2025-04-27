import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/categories";
import { addCategoryAsync } from "@thunks/categories";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TCreateCategoryForm } from "../../types";
import { BaseForm } from "@components/forms/base-form";
import { addBtnLabel } from "@utils/constants";
import { useSelector } from "react-redux";

export const AddCategoryForm: FC<FormProps> = ({ onClose }) => {
  const initialState: TCreateCategoryForm = {
    name: "",
    parentName: "",
    unitName: "",
  };
  const isAdding = useSelector(getIsAddingSelector);
  const { dispatch, formData, setFormData, onChange } =
    useForm<TCreateCategoryForm>(initialState);

  const handleSubmit = async () => {
    try {
      await dispatch(
        addCategoryAsync({
          name: formData.name,
          parentName: formData.parentName,
          unitName: formData.unitName,
        })
      ).unwrap();

      setFormData(initialState);
    } catch (err: unknown) {
      dispatchErrorToast(dispatch, getErrorMessage(err));
    }
  };

  return (
    <BaseForm
      title="Добавление категории"
      btnLabel={addBtnLabel}
      isProgress={isAdding}
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
      </>
    </BaseForm>
  );
};
