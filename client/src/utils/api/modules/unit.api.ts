import { TCreateUnitData, TUnit } from "@utils/types";
import { BaseApi } from "./base/base.api";

export class UnitApi extends BaseApi {
  constructor(baseUrl: string, private endpoint: string) {
    super(baseUrl);
  }

  getAll(): Promise<TUnit[]> {
    return this.get(this.endpoint);
  }

  create(unitData: TCreateUnitData): Promise<TUnit> {
    return this.post(this.endpoint, unitData);
  }
}
