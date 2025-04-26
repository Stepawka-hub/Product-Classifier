import { TCreateUnitData, TPaginatedData, TUnit, TUpdateUnitData } from "@utils/types";
import { PaginationParams, TServerResponse } from "../types/types";
import { BaseApi } from "./base/base.api";

export class UnitApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TUnit>> {
    return this.get(params);
  }

  createUnit(unitData: TCreateUnitData): Promise<TServerResponse> {
    return this.post(unitData);
  }

  updateUnit(unitData: TUpdateUnitData): Promise<TServerResponse> {
    return this.update(unitData);
  }

  deleteUnit(id: number): Promise<TServerResponse> {
    return this.delete(id);
  }
}
