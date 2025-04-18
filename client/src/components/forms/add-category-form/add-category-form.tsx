import { AddCategoryFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";

export const AddCategoryForm: FC<AddFormProps> = ({ onClose }) => {
  const handleSubmit = () => {
    onClose();
  };

  return <AddCategoryFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
