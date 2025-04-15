import { getProductsSelector } from "@slices/products";
import { useSelector } from "@store";
import { ProductsPageUI } from "@ui/pages";

export const ProductsPage = () => {
  const products = useSelector(getProductsSelector);
  const headers = ['ID продукта', 'Название продукта', 'ID категории', 'ID ЕИ'];

  const addProduct = () => alert("Добавление продукта");

  return (
    <ProductsPageUI
      headers={headers}
      products={products}
      addProduct={addProduct} 
    />
  );
};
