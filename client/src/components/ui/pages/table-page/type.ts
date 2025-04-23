import { TEntityPageUI } from '@components/types';

export type TablePageUIProps<T> = TEntityPageUI<T> & {
  title: string;
  addButtonLabel: string;
};
