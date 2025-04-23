import { getIsAddingSeletor } from "@slices/products";
import { useDispatch, useSelector } from "@store";
import { addProductAsync } from "@thunks/products";
import { AddProductFormUI } from "@ui/forms";
import { ChangeEventHandler, FC, useState } from "react";
import { AddFormProps } from "../types/types";

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const isAdding = useSelector(getIsAddingSeletor);
  const initialState = {
    name: "",
    parentId: "",
    unitId: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange =
    (key: keyof typeof formData): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = () => {
    dispatch(
      addProductAsync({
        name: formData.name,
        parentId: Number(formData.parentId),
        unitId: Number(formData.unitId),
      })
    );

    setFormData(initialState);
  };

  return (
    <AddProductFormUI
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
