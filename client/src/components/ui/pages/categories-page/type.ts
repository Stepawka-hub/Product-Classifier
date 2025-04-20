import { TCategory, TPagination } from '@utils/types';
import { ModalHandlers } from '../types/types';

export type CategoriesPageUIProps = ModalHandlers & {
  categories: TCategory[];
  pagination?: TPagination;
};