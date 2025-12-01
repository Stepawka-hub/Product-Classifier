import {
  TClassifier,
  TClassifierShort,
  TCreateClassifierData,
  TPaginatedData,
  TProduct,
  TUpdateClassifierData,
} from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams, TServerResponse } from "../types/types";

export class ClassifierApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TClassifier>> {
    return this.get(params);
  }

  getParents(
    id: number,
    params: PaginationParams
  ): Promise<TPaginatedData<TClassifierShort>> {
    return this.get(params, `${id}/parents`);
  }

  getChildren(
    id: number,
    params: PaginationParams
  ): Promise<TPaginatedData<TClassifierShort>> {
    return this.get(params, `${id}/children`);
  }

  getLeaves(
    id: number,
    params: PaginationParams
  ): Promise<TPaginatedData<TProduct>> {
    return this.get(params, `${id}/leaves`);
  }

  createClassifier(classifierData: TCreateClassifierData): Promise<TServerResponse> {
    return this.post(classifierData);
  }

  updateClassifier(classifierData: TUpdateClassifierData): Promise<TServerResponse> {
    return this.update(classifierData);
  }

  deleteClassifier(id: number): Promise<TServerResponse> {
    return this.delete(id);
  }
}
