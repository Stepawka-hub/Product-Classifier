import { FC } from "react";

import { useSelector } from "@store";
import { getSelectedProductSelector } from "@selectors/products";
import { dispatchErrorToast } from "@services/helpers/toast";
import { getIsAddingModification } from "@slices/products";
import { changeProductVersionAsync } from "@thunks/products";

import { useForm } from "@hooks/forms/useForm";
import { createBtnLabel } from "@utils/constants";
import { getErrorMessage } from "@utils/helpers/error";
import { parseStringToArray } from "@utils/helpers/array.helpers";

import { BaseForm } from "@components/forms/base-form";
import { Input } from "@components/forms/form-elements";
import { FormSymbolHint } from "@ui/form-symbol-hint";

import { TCreateProductModificationForm } from "./types";
import { FormProps } from "../types";

export const CreateProductModificationForm: FC<FormProps> = ({ onClose }) => {
  const selectedProduct = useSelector(getSelectedProductSelector);
  const isAdding = useSelector(getIsAddingModification);

  const prefix = "product-modification";
  const initialState: TCreateProductModificationForm = {
    name: "",
    baseProductId: "",
    componentIds: "",
    consumptions: "",
    forQuanities: "",
  };

  const { dispatch, formData, setFormData, onChange } =
    useForm<TCreateProductModificationForm>(initialState, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleSubmit = async () => {
    try {
      const componentIds = parseStringToArray(formData.componentIds);
      const consumptions = parseStringToArray(formData.consumptions);
      const forQuanities = parseStringToArray(formData.forQuanities);

      if (
        componentIds.length !== consumptions.length ||
        componentIds.length !== forQuanities.length
      ) {
        dispatchErrorToast(
          dispatch,
          "Количество параметров в списках должно быть одинаковым"
        );
        return;
      }

      await dispatch(
        changeProductVersionAsync({
          id: selectedProduct.id,
          name: formData.name || null,
          newComponentIds: componentIds.map((e) => Number(e)),
          newConsumptions: consumptions.map((e) => Number(e)),
          newForQuantities: forQuanities.map((e) => Number(e)),
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
      title="Создание модификации изделия"
      btnLabel={createBtnLabel}
      isProgress={isAdding}
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
        id={`${prefix}_baseProductId`}
        name="baseProductId"
        label="ID базового изделия"
        value={formData.baseProductId}
        onChange={onChange("baseProductId")}
        maxLength={32}
      />
      <Input
        id={`${prefix}_componentIds`}
        name="componentIds"
        label="Список ID новых компонентов"
        value={formData.componentIds}
        onChange={onChange("componentIds")}
        maxLength={64}
      />
      <Input
        id={`${prefix}_consumptions`}
        name="consumptions"
        label="Список норм расходов"
        value={formData.consumptions}
        onChange={onChange("consumptions")}
        maxLength={64}
      />
      <Input
        id={`${prefix}_forQuanities`}
        name="forQuanities"
        label="Список для количества"
        value={formData.forQuanities}
        onChange={onChange("forQuanities")}
        maxLength={64}
      />
      <FormSymbolHint />
    </BaseForm>
  );
};
