import { ChangeEvent, useEffect, useState } from "react";
import {
  getConsumptionCalculation,
  getConsumptionPagination,
  getIsCalculating,
  setConsumptionCurrentPage,
} from "@slices/products";
import { useDispatch, useSelector } from "@store";
import { calculateTotalConsumptionAsync } from "@thunks/products";
import { TablePage } from "@ui/pages";
import { useDebounce } from "@hooks/useDebounce";
import { usePagination } from "@hooks/usePagination";
import { consumptionHeaders as headers } from "@utils/constants";
import { TProductComponent } from "@utils/types";
import { getSelectedProductSelector } from "@selectors/products";
import { NotFound } from "@components/not-found";
import { Input } from "@components/forms";
import s from "./total-consumption-page.module.css";

export const TotalConsumptionPage = () => {
  const dispatch = useDispatch();

  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getConsumptionPagination,
    setConsumptionCurrentPage
  );

  const selectedProduct = useSelector(getSelectedProductSelector);
  const { id: selectedProductId, name: productName } = selectedProduct || {};
  const components = useSelector(getConsumptionCalculation);
  const isLoading = useSelector(getIsCalculating);

  const [productQuantity, setProductQuantity] = useState(1);

  const handleChangeProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(parseInt(e.target.value.trim())) || 1;
    setProductQuantity(value > 0 ? value : 1);
  };

  const handleChangeProductQuantityDebounced = useDebounce(
    handleChangeProductQuantity
  );

  useEffect(() => {
    if (!selectedProductId) return;

    dispatch(
      calculateTotalConsumptionAsync({
        productId: selectedProductId,
        params: {
          page: currentPage,
          limit: pageSize,
          count: productQuantity,
        },
      })
    );
  }, [dispatch, selectedProductId, currentPage, pageSize, productQuantity]);

  if (!selectedProduct) return <NotFound />;

  return (
    <>
      {!isLoading && (
        <TablePage<TProductComponent>
          title={`Расчёт сводных норм расхода - "${productName}"`}
          tableConfig={{ headers, data: components }}
          pagination={{ ...pagination, setCurrentPage: setPageNumber }}
          selectable={false}
        />
      )}
      <div className={s.inputWrapper}>
        <Input
          id="product-quantity"
          name="product-quantity"
          label="Для какого количества изделий:"
          placeholder="Количество..."
          defaultValue={1}
          onChange={handleChangeProductQuantityDebounced}
          maxLength={4}
        />
      </div>
    </>
  );
};
