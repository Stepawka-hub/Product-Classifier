import { TCreateUnitData, TUnit } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class UnitApi extends BaseApi {
  constructor(baseUrl: string, baseEndpoint: string) {
    super(baseUrl, baseEndpoint);
  }

  getAll(): Promise<TUnit[]> {
    return this.get();
  }

  create(unitData: TCreateUnitData): Promise<TUnit> {
    return this.post('', unitData);
  }
}
