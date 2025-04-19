import { AddProductFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";
import { nanoid } from "@reduxjs/toolkit";
import { addProductAsync } from "@thunks/products";
import { useDispatch } from '@store';

export const AddProductForm: FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const fakeData = {
    name: "Test Product" + nanoid(),
    unitId: 2,
    parentId: 2,
  }

  const handleSubmit = () => {
    dispatch(
      addProductAsync(fakeData)
    );
    onClose();
  };

  return <AddProductFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
