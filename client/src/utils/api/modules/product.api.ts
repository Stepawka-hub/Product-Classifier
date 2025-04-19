import { TCreateProductData, TProduct } from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams } from "../types/types";

export class ProductApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TProduct[]> {
    return this.get("", params);
  }

  create(productData: TCreateProductData): Promise<TProduct> {
    return this.post("", productData);
  }
}
