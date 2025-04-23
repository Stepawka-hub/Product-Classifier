import { AddCategoryFormUI } from "@ui/forms";
import { ChangeEventHandler, FC, useState } from "react";
import { AddFormProps } from "../types/types";
import { getIsAddingSeletor } from "@slices/categories";
import { addCategoryAsync } from "@thunks/categories";
import { useDispatch, useSelector } from "@store";

export const AddCategoryForm: FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const isAdding = useSelector(getIsAddingSeletor);
  const initialState = {
    name: "",
    parentName: "",
    unitName: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange =
    (key: keyof typeof formData): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = () => {
    dispatch(addCategoryAsync(formData));

    setFormData(initialState);
  };

  return (
    <AddCategoryFormUI
      isAdding={isAdding}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
