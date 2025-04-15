import { getProductsSelector } from "@slices/products";
import { useSelector } from "@store";
import { ProductsPageUI } from "@ui/pages";
import { productsHeaders } from '@utils/constants';

export const ProductsPage = () => {
  const products = useSelector(getProductsSelector);

  const addProduct = () => alert("Добавление продукта");

  return (
    <ProductsPageUI
      headers={productsHeaders}
      products={products}
      addProduct={addProduct} 
    />
  );
};
