import { TCreateProductData, TPaginatedData, TProduct } from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams, TServerResponse } from "../types/types";

export class ProductApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TProduct>> {
    return this.get("", params);
  }

  create(productData: TCreateProductData): Promise<TServerResponse> {
    return this.post("", productData);
  }
}
