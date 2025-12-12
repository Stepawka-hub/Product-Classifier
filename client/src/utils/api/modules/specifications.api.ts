import { TPaginatedData, TSpecification } from "@utils/types";
import { PaginationParams } from "../types";
import { BaseApi } from "./base/base.api";

export class SpecificationApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TSpecification>> {
    return this.get(params);
  }
}
