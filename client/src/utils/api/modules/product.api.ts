import { TCreateProductData, TProduct } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class ProductApi extends BaseApi {
  constructor(baseUrl: string, private endpoint: string) {
    super(baseUrl);
  }

  getAll(): Promise<TProduct[]> {
    return this.get(this.endpoint);
  }

  create(productData: TCreateProductData): Promise<TProduct> {
    return this.post(this.endpoint, productData);
  }
}
