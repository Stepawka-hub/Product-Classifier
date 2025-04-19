import { TCreateProductData, TProduct } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class ProductApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(): Promise<TProduct[]> {
    return this.get();
  }

  create(productData: TCreateProductData): Promise<TProduct> {
    return this.post("", productData);
  }
}
