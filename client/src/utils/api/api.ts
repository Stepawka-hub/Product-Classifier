const URL = import.meta.env.VITE_API_URL;

class Api {
  constructor(private URL: string) {};

  getProducts = async (): Promise<string> => {
    const res = await fetch(`${this.URL}/product`);
    if (!res.ok) {
      throw new Error('Произошла ошибка при получении продуктов!');
    }

    const data = await res.text();
    return data;
  }

  fillData = async () => {
    const res = await fetch(`${this.URL}/fill-data`);
    if (!res.ok) {
      throw new Error('Произошла ошибка при заполнении данных!');
    }
  }
}

export const api = new Api(URL);
