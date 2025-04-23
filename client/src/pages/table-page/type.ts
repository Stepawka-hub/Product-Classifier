import { TEntityPageUI } from '@components/types';

export type TablePageProps<T> = TEntityPageUI<T> & {
  title: string;
  addButtonLabel: string;
};
