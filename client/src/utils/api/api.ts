import { ProductApi } from "./modules/product.api";
import { UnitApi } from "./modules/unit.api";
import { CategoryApi } from "./modules/category.api";
import { AppApi } from "./modules/app.api";

const URL = import.meta.env.VITE_API_URL;
export const SUCCESS_CODE = 0;

class Api {
  public readonly products: ProductApi;
  public readonly units: UnitApi;
  public readonly categories: CategoryApi;
  public readonly app: AppApi;

  constructor(baseUrl: string) {
    this.products = new ProductApi(baseUrl, "products");
    this.units = new UnitApi(baseUrl, "units");
    this.categories = new CategoryApi(baseUrl, "categories");
    this.app = new AppApi(baseUrl);
  }
}

export const api = new Api(URL);
