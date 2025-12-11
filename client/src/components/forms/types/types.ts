import { TProduct } from "@utils/types";

export interface BaseFormProps
  extends React.PropsWithChildren<React.HTMLProps<HTMLFormElement>> {
  title: string;
  btnLabel: {
    default: string;
    disabled: string;
  };
  isProgress: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export type FormProps = Pick<BaseFormProps, "onClose">;

// Create Data Form
export type TCreateClassifierForm = {
  name: string;
  parentName: string;
  unitName: string;
};

export type TCreateProductForm = {
  name: string;
  parentId: string;
  unitId: string;
  classifierId: string;
  baseProductId: string;
};

export type TCreateUnitForm = {
  name: string;
};

// Update Data Form
export type TUpdateClassifierForm = {
  name: string;
  parentName: string;
  unitName: string;
  needInheritInLeaves: boolean;
};

export type TUpdateProductForm = Omit<TProduct, "id">;
export type TUpdateUnitForm = TCreateUnitForm;
