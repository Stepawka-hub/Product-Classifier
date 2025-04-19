import { TCategory, TCreateCategoryData } from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams, TPaginatedResponse } from "../types/types";

export class CategoryApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedResponse<TCategory>> {
    return this.get("", params);
  }

  create(categoryData: TCreateCategoryData): Promise<TCategory> {
    return this.post("", categoryData);
  }
}
