import { useEffect } from "react";
import {
  getConsumptionCalculation,
  getConsumptionPagination,
  getIsCalculating,
  setConsumptionCurrentPage,
} from "@slices/products";
import { useDispatch, useSelector } from "@store";
import { calculateTotalConsumptionAsync } from "@thunks/products";
import { Loader } from "@components/common/loader";
import { TablePage } from "@ui/pages";
import { consumptionHeaders as headers } from "@utils/constants";
import { TProductComponent } from "@utils/types";
import { usePagination } from "@hooks/usePagination";
import { getSelectedProductSelector } from "@selectors/products";
import { NotFound } from "@components/not-found";

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

  useEffect(() => {
    if (!selectedProductId) return;

    dispatch(
      calculateTotalConsumptionAsync({
        productId: selectedProductId,
        params: {
          page: currentPage,
          limit: pageSize,
          count: 1,
        },
      })
    );
  }, [dispatch, selectedProductId, currentPage, pageSize]);

  if (isLoading) return <Loader />;
  if (!selectedProduct) return <NotFound />;

  return (
    <TablePage<TProductComponent>
      title={`Расчёт сводных норм расхода - "${productName}"`}
      tableConfig={{ headers, data: components }}
      pagination={{ ...pagination, setCurrentPage: setPageNumber }}
      selectable={false}
    />
  );
};
