import { ReactElement } from 'react';

export type BaseAddFormProps = {
  children: ReactElement;
  onSubmit: () => void;
  onClose: () => void;
};
