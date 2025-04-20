import { TCreateUnitData, TPaginatedData, TUnit } from "@utils/types";
import { BaseApi } from "./base/base.api";
import { PaginationParams } from "../types/types";

export class UnitApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(params: PaginationParams): Promise<TPaginatedData<TUnit>> {
    return this.get("", params);
  }

  create(unitData: TCreateUnitData): Promise<TUnit> {
    return this.post("", unitData);
  }
}
