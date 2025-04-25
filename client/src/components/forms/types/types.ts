export type AddFormProps = {
  title: string;
  isAdding: boolean;
  onClose: () => void;
};

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
