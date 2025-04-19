import { TCategory } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class CategoryApi extends BaseApi {
  constructor(baseUrl: string, private endpoint: string) {
    super(baseUrl);
  }

  getAll(): Promise<TCategory[]> {
    return this.get(this.endpoint);
  }
}
