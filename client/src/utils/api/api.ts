import { TAppData, TCategory, TProduct, TUnit } from '@utils/types';
import { TCreateProductData, TCreateUnitData, TServerResponse } from './types/types';

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

    return await res.json();
  }

  clearData = async (): Promise<TServerResponse> => {
    const res = await fetch(`${this.URL}/clear-data`, {
      method: 'POST'
    });

    if (!res.ok) {
      throw new Error('Произошла ошибка при очистке данных!');
    }

    return await res.json();
  }

  addUnit = async (createUnitData: TCreateUnitData): Promise<TUnit> => {
    const res = await fetch(`${this.URL}/units`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(createUnitData)
    });

    if (!res.ok) {
      throw new Error('Произошла ошибка при добавлении ЕИ!');
    }

    const result = await res.json();
    console.log(result);

    return result;
  }

  addProduct = async (createProductData: TCreateProductData): Promise<TUnit> => {
    const res = await fetch(`${this.URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(createProductData)
    });

    if (!res.ok) {
      throw new Error('Произошла ошибка при добавлении изделия!');
    }

    const result = await res.json();
    console.log(result);

    return result;
  }
}

export const api = new Api(URL);
