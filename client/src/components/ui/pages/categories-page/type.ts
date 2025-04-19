import { TCategory } from '@utils/types';
import { ModalHandlers } from '../types/types';
import { TPagination } from '@components/pagination/type';

export type CategoriesPageUIProps = ModalHandlers & {
  categories: TCategory[];
  pagination?: TPagination;
};