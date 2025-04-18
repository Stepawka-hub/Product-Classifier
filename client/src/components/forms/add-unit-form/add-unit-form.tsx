import { AddUnitFormUI } from "@ui/forms";
import { FC } from "react";
import { AddUnitFormProps } from './type';

export const AddUnitForm: FC<AddUnitFormProps> = ({ onClose }) => {
  const handleSubmit = () => {
    onClose();
  }

  return <AddUnitFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
