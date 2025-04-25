import { ChangeEventHandler } from "react";

export type AddEntityFormUIProps<T> = AddFormUIProps & {
  formData: T;
  onChange: (key: keyof T) => ChangeEventHandler<HTMLInputElement>;
};

export type AddFormUIProps = {
  title: string;
  isAdding: boolean;
  onSubmit: () => void;
  onClose: () => void;
};
