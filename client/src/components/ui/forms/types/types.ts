import { ChangeEventHandler } from "react";

export type AddEntityFormUIProps<T> = AddFormUIProps & {
  formData: T;
  onChange: (key: keyof T) => ChangeEventHandler<HTMLInputElement>;
};

export type AddFormUIProps = {
  isAdding: boolean;
  onSubmit: () => void;
  onClose: () => void;
};
