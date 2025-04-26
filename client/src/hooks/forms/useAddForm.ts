import { Selector } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { ChangeEventHandler, useState } from "react";

export const useAddForm = <T>(
  getIsAddingSelector: Selector<RootState, boolean>,
  initialState: T
) => {
  const dispatch = useDispatch();
  const isAdding = useSelector(getIsAddingSelector);
  const [formData, setFormData] = useState(initialState);

  const onChange =
    (key: keyof typeof formData): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return { dispatch, formData, setFormData, onChange, isAdding };
};
