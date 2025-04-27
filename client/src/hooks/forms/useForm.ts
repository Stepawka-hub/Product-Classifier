import { useDispatch } from "@store";
import { ChangeEventHandler, useEffect, useState } from "react";

export const useForm = <T>(initialState: T, deps?: unknown[]) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (deps !== undefined) {
      setFormData(initialState);
    }
  }, deps);

  const onChange =
    (key: keyof typeof formData): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return { dispatch, formData, setFormData, onChange };
};
