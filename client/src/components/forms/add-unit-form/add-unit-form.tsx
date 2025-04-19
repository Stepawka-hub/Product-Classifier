import { api } from '@api';
import { AddUnitFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";
import { nanoid } from '@reduxjs/toolkit';

export const AddUnitForm: FC<AddFormProps> = ({ onClose }) => {
  const handleSubmit = () => {
    api.addUnit({
      name: 'Test' + nanoid()
    })
    onClose();
  };

  return <AddUnitFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
