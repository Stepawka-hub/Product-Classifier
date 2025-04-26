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

export type TCreateCategoryForm = {
  name: "";
  parentName: "";
  unitName: "";
};

export type TCreateProductForm = {
  name: "";
  parentId: "";
  unitId: "";
};

export type TCreateUnitForm = {
  name: "";
};
