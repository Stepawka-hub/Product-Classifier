import { TCategory } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class CategoryApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(): Promise<TCategory[]> {
    return this.get();
  }
}
