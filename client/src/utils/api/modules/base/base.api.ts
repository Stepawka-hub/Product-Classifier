export class BaseApi {
  constructor(protected baseUrl: string) {}

  protected async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${endpoint}`);
    if (!res.ok) throw new Error(`Ошибка при запросе ${endpoint}`);
    return res.json();
  }

  protected async post<T>(endpoint: string, data: unknown = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Ошибка при запросе ${endpoint}`);
    return res.json();
  }
}
