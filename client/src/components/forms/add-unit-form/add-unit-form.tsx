import { AddUnitFormUI } from "@ui/forms";
import { FC } from "react";
import { AddFormProps } from "../types/types";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "@store";
import { addUnitAsync } from "@thunks/units";

export const AddUnitForm: FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const fakeData = {
    name: "Test" + nanoid(),
  };

  const handleSubmit = () => {
    dispatch(addUnitAsync(fakeData));
    onClose();
  };

  return <AddUnitFormUI onSubmit={handleSubmit} onClose={onClose} />;
};
