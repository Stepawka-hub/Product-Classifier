import {
  TClassifier,
  TClassifierShort,
  TCreateClassifierData,
  TEntityId,
  TPaginatedData,
  TUpdateClassifierData,
} from "@utils/types";
import { PaginationParams, TServerResponse } from "../types";
import { BaseApi } from "./base/base.api";

export class ClassifierApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TClassifier>> {
    return this.get(params);
  }

  getParents(
    id: TEntityId,
    params: PaginationParams
  ): Promise<TPaginatedData<TClassifierShort>> {
    return this.get(params, `${id}/parents`);
  }

  getChildren(
    id: TEntityId,
    params: PaginationParams
  ): Promise<TPaginatedData<TClassifierShort>> {
    return this.get(params, `${id}/children`);
  }

  createClassifier(
    classifierData: TCreateClassifierData
  ): Promise<TServerResponse> {
    return this.post(classifierData);
  }

  updateClassifier(
    classifierData: TUpdateClassifierData
  ): Promise<TServerResponse> {
    return this.update(classifierData);
  }

  deleteClassifier(id: number): Promise<TServerResponse> {
    return this.delete(id);
  }
}
