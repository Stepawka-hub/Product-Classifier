export class BaseApi {
  protected baseUrl: string;

  constructor(baseUrl: string, baseEndpoint: string = "") {
    this.baseUrl = baseEndpoint ? `${baseUrl}/${baseEndpoint}` : baseUrl;
  }

  protected async get<T>(
    endpoint: string = "",
    params?: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ошибка при запросе ${endpoint}`);
    return res.json();
  }

  protected async post<T>(
    endpoint: string = "",
    data: unknown = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const res = await fetch(url, {
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
