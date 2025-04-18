import { AddProductFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const handleSubmit = () => {
    onClose();
  };

  return <AddProductFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
