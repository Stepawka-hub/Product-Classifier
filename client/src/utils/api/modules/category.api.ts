import {
  TCategory,
  TCreateCategoryData,
  TPaginatedData,
  TUpdateCategoryData,
} from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams, TServerResponse } from "../types/types";

export class CategoryApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TCategory>> {
    return this.get(params);
  }

  createCategory(categoryData: TCreateCategoryData): Promise<TServerResponse> {
    return this.post(categoryData);
  }

  updateCategory(categoryData: TUpdateCategoryData): Promise<TServerResponse> {
    return this.update(categoryData);
  }

  deleteCategory(id: number): Promise<TServerResponse> {
    return this.delete(id);
  }
}
