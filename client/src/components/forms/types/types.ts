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
export type TCreateCategoryForm = {
  name: string;
  parentName: string;
  unitName: string;
};

export type TCreateProductForm = {
  name: string;
  parentId: string;
  unitId: string;
};

export type TCreateUnitForm = {
  name: string;
};

// Update Data Form
export type TUpdateCategoryForm = {
  name: string;
  parentName: string;
  unitName: string;
  needInheritInLeaves: boolean;
};

export type TUpdateProductForm = TCreateProductForm;
export type TUpdateUnitForm = TCreateUnitForm;
