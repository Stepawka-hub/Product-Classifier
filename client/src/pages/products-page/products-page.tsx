import { ProductsPageUI } from '@ui/pages';

export const ProductsPage = () => {
  const addProduct = () => alert('Добавление продукта');
  return <ProductsPageUI addProduct={addProduct} />
}