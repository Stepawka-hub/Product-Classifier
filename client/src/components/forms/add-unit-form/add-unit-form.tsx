import { AddUnitFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";

export const AddUnitForm: FC<AddFormProps> = ({ onClose }) => {
  const handleSubmit = () => {
    onClose();
  };

  return <AddUnitFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
