import { FC } from "react";

import { useSelector } from "@store";
import { getSelectedProductSelector } from "@selectors/products";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsUpdatingSelector } from "@slices/products";

import { useForm } from "@hooks/forms/useForm";
import { addBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";

import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { FormProps } from "../types";
import { TChangeProductVersionForm } from "./types";
import { parseStringToArray } from "@utils/helpers/array.helpers";
import { changeProductVersionAsync } from "@thunks/products";
import s from "./change-product-version-form.module.css";

export const ChangeProductVersionForm: FC<FormProps> = ({ onClose }) => {
  const editingProduct = useSelector(getSelectedProductSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);

  const prefix = "change-product-version";
  const initialState: TChangeProductVersionForm = {
    name: "",
    newComponentIds: "",
    newConsumptions: "",
    newForQuanities: "",
  };

  const { dispatch, formData, setFormData, onChange } =
    useForm<TChangeProductVersionForm>(initialState, [editingProduct]);

  if (!editingProduct) return null;

  const handleSubmit = async () => {
    try {
      const newComponentIds = parseStringToArray(formData.newComponentIds);
      const newConsumptions = parseStringToArray(formData.newConsumptions);
      const newForQuanities = parseStringToArray(formData.newForQuanities);

      if (
        newComponentIds.length !== newConsumptions.length ||
        newComponentIds.length !== newForQuanities.length
      ) {
        dispatchErrorToast(
          dispatch,
          "Количество параметров в списках должно быть одинаковым"
        );
        return;
      }

      await dispatch(
        changeProductVersionAsync({
          id: editingProduct.id,
          name: formData.name || null,
          newComponentIds: newComponentIds.map((e) => Number(e)),
          newConsumptions: newConsumptions.map((e) => Number(e)),
          newForQuantities: newForQuanities.map((e) => Number(e)),
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
      btnLabel={addBtnLabel}
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
      />
      <Input
        id={`${prefix}_newComponentIds`}
        name="newComponentIds"
        label="Список ID новых компонентов"
        value={formData.newComponentIds}
        onChange={onChange("newComponentIds")}
        maxLength={64}
      />
      <Input
        id={`${prefix}_newConsumptions`}
        name="newConsumptions"
        label="Список норм расходов"
        value={formData.newConsumptions}
        onChange={onChange("newConsumptions")}
        maxLength={64}
      />
      <Input
        id={`${prefix}_newForQuanities`}
        name="newForQuanities"
        label="Список для количества"
        value={formData.newForQuanities}
        onChange={onChange("newForQuanities")}
        maxLength={64}
      />
      <p className={s.hint}>
        Элементы в списке необходимо разделять знаком{" "}
        <span className={s.symbol}>;</span>
      </p>
    </BaseForm>
  );
};
