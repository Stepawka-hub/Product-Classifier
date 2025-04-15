import { TProduct } from '@utils/types';

export type ProductsPageUIProps = {
  headers: string[];
  products: TProduct[];
  addProduct: () => void;
};