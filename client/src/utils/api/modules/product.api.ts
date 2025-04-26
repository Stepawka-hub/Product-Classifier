import { TCreateProductData, TPaginatedData, TProduct } from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams, TServerResponse } from "../types/types";

export class ProductApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TProduct>> {
    return this.get(params);
  }

  createProduct(productData: TCreateProductData): Promise<TServerResponse> {
    return this.post(productData);
  }

  deleteProduct(id: number): Promise<TServerResponse> {
    return this.delete(id);
  }
}
