import { TAppData, TCategory, TProduct, TUnit } from '@utils/types';
import { TServerResponse } from './types/types';

const URL = import.meta.env.VITE_API_URL;
export const SUCCESS_CODE = 0;

class Api {
  constructor(private URL: string) {};

  getProducts = async (): Promise<TProduct[]> => {
    const res = await fetch(`${this.URL}/products`);
    if (!res.ok) {
      throw new Error('Произошла ошибка при получении продуктов!');
    }

    return await res.json();
  }

  getCategories = async (): Promise<TCategory[]> => {
    const res = await fetch(`${this.URL}/categories`);
    if (!res.ok) {
      throw new Error('Произошла ошибка при получении категорий!');
    }

    return await res.json();
  }

  getUnits = async (): Promise<TUnit[]> => {
    const res = await fetch(`${this.URL}/units`);
    if (!res.ok) {
      throw new Error('Произошла ошибка при получении единиц измерения!');
    }

    return await res.json();
  }

  fillData = async (): Promise<TAppData> => {
    const res = await fetch(`${this.URL}/fill-data`, {
      method: 'POST'
    });

    if (!res.ok) {
      throw new Error('Произошла ошибка при заполнении данных!');
    }

    return res.json();
  }

  clearData = async (): Promise<TServerResponse> => {
    const res = await fetch(`${this.URL}/clear-data`, {
      method: 'POST'
    });

    if (!res.ok) {
      throw new Error('Произошла ошибка при очистке данных!');
    }

    return res.json();
  }
}

export const api = new Api(URL);
