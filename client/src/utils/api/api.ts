const URL = import.meta.env.VITE_API_URL;

class Api {
  getProducts = async (): Promise<string> => {
    const res = await fetch(`${URL}/product`);
    if (!res.ok) {
      throw new Error('Произошла ошибка при получении продуктов');
    }

    const data = await res.text();
    return data;
  }
}

export const api = new Api();
