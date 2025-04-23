import { TCreateUnitData, TPaginatedData, TUnit } from "@utils/types";
import { PaginationParams, TServerResponse } from "../types/types";
import { BaseApi } from "./base/base.api";

export class UnitApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TUnit>> {
    return this.get("", params);
  }

  create(unitData: TCreateUnitData): Promise<TServerResponse> {
    return this.post("", unitData);
  }
}
