import { FC } from "react";

import { useSelector } from '@store';
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingSelector } from "@slices/classifiers";
import { addClassifierAsync } from "@thunks/classifiers";
import { useForm } from "@hooks/forms/useForm";
import { getErrorMessage } from "@utils/helpers/error";
import { addBtnLabel } from "@utils/constants";

import { Input } from "@components/forms/form-elements";
import { BaseForm } from "@components/forms/base-form";
import { FormProps, TCreateClassifierForm } from "../../types";

export const AddClassifierForm: FC<FormProps> = ({ onClose }) => {
  const prefix = "classifier-add";
  const initialState: TCreateClassifierForm = {
    name: "",
    parentName: "",
    unitName: "",
  };
  const isAdding = useSelector(getIsAddingSelector);
  const { dispatch, formData, setFormData, onChange } =
    useForm<TCreateClassifierForm>(initialState);

  const handleSubmit = async () => {
    try {
      await dispatch(
        addClassifierAsync({
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
      title="Добавление классификатора"
      btnLabel={addBtnLabel}
      isProgress={isAdding}
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
      </>
    </BaseForm>
  );
};
