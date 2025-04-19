export class BaseApi {
  protected baseUrl: string;

  constructor(baseUrl: string, baseEndpoint: string = "") {
    this.baseUrl = baseEndpoint ? `${baseUrl}/${baseEndpoint}` : baseUrl;
    console.log(this.baseUrl);
  }

  protected async get<T>(endpoint: string = ""): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

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
