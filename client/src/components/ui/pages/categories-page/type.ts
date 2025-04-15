import { TCategory } from '@utils/types';

export type CategoriesPageUIProps = {
  headers: string[];
  categories: TCategory[];
  addCategory: () => void;
};