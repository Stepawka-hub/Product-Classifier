import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { useForm } from "@hooks/forms/useForm";
import { dispatchErrorToast } from "@services/helpers/toast";
import { updateUnitAsync } from "@thunks/units";
import { editBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { FC } from "react";
import { FormProps, TUpdateUnitForm } from "../../types";
import { useSelector } from "@store";
import {
  getEditingItemSelector,
  getIsUpdatingSelector,
  setEditingItem,
} from "@slices/units";

export const EditUnitForm: FC<FormProps> = ({ onClose }) => {
  const editingUnit = useSelector(getEditingItemSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const prefix = "unit-edit";
  const initialState: TUpdateUnitForm = {
    name: editingUnit?.name || "",
  };
  const { dispatch, formData, setFormData, onChange } =
    useForm<TUpdateUnitForm>(initialState, [editingUnit]);

  if (!editingUnit) return null;

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateUnitAsync({
          id: editingUnit.id,
          name: formData.name,
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
      title="Обновление ЕИ"
      btnLabel={editBtnLabel}
      isProgress={isUpdating}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <Input
          id={`${prefix}_name`}
          name="name"
          label="Название ЕИ"
          value={formData.name}
          onChange={onChange("name")}
          maxLength={64}
          required
        />
      </>
    </BaseForm>
  );
};
