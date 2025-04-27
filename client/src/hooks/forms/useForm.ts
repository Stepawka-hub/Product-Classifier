import { useDispatch } from "@store";
import { ChangeEventHandler, useState } from "react";

export const useForm = <T>(initialState: T) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const onChange =
    (key: keyof typeof formData): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return { dispatch, formData, setFormData, onChange };
};
