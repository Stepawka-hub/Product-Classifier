import {
  TCategory,
  TCategoryShort,
  TCreateCategoryData,
  TPaginatedData,
  TProduct,
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

  getParents(
    id: number,
    params: PaginationParams
  ): Promise<TPaginatedData<TCategoryShort>> {
    return this.get(params, `${id}/parents`);
  }

  getChildren(
    id: number,
    params: PaginationParams
  ): Promise<TPaginatedData<TCategoryShort>> {
    return this.get(params, `${id}/children`);
  }

  getLeaves(
    id: number,
    params: PaginationParams
  ): Promise<TPaginatedData<TProduct>> {
    return this.get(params, `${id}/leaves`);
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
