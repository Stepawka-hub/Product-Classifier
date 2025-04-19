import { TAppData } from '@utils/types';
import { BaseApi } from './base/base.api';
import { TServerResponse } from '../types/types';

export class AppApi extends BaseApi {
  fillData(): Promise<TAppData> {
    return this.post('fill-data');
  }

  clearData(): Promise<TServerResponse> {
    return this.post('clear-data');
  }
}