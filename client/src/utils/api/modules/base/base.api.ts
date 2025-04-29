export class BaseApi {
  protected baseUrl: URL;

  constructor(baseUrl: string, baseEndpoint: string = "") {
    this.baseUrl = new URL(baseEndpoint, baseUrl + "/");
  }

  protected async get<T>(
    params?: Record<string, string | number>,
    endpoint: string = ""
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.addSearchParams(url, params);
    return this.fetch(url);
  }

  protected async post<T>(
    data: Record<string, unknown> = {},
    endpoint: string = ""
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  protected async update<T>(
    data: Record<string, unknown> = {},
    endpoint: string = ""
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  protected async delete<T>(
    id: number | string,
    endpoint: string = ""
  ): Promise<T> {
    const url = this.buildUrl(endpoint, id);
    return this.fetch(url, { method: "DELETE" });
  }

  private buildUrl(endpoint: string, id?: string | number): URL {
    const url = new URL(this.baseUrl);
    url.pathname = [url.pathname, endpoint, id]
      .filter(Boolean)
      .join("/")
      .replace(/\/+/g, "/");
    return url;
  }

  private addSearchParams(url: URL, params?: Record<string, string | number>) {
    if (!params) return;

    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.append(key, String(value));
    });
  }

  private async fetch<T>(url: URL, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      ...init,
    });

    if (!res.ok) {
      throw new Error(`Ошибка при запросе: ${url.pathname}`);
    }

    return res.json();
  }
}
