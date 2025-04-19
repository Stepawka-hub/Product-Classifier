import { TCategory, TCreateCategoryData } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class CategoryApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(): Promise<TCategory[]> {
    return this.get();
  }

  create(categoryData: TCreateCategoryData): Promise<TCategory> {
    return this.post("", categoryData);
  }
}
