import { AddProductFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";
import { api } from '@api';
import { nanoid } from '@reduxjs/toolkit';

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const handleSubmit = () => {
    api.addProduct({
      name: 'Test Product' + nanoid(),
      unitId: 8,
      parentId: 2 
    });
    onClose();
  };

  return <AddProductFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
