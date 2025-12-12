import { ProductApi } from "./modules/product.api";
import { UnitApi } from "./modules/unit.api";
import { ClassifierApi } from "./modules/classifier.api";
import { AppApi } from "./modules/app.api";
import { SpecificationApi } from "./modules/specifications.api";

const URL = import.meta.env.VITE_API_URL;
export const SUCCESS_CODE = 0;

class Api {
  public readonly products: ProductApi;
  public readonly units: UnitApi;
  public readonly classifiers: ClassifierApi;
  public readonly specifications: SpecificationApi;
  public readonly app: AppApi;

  constructor(baseUrl: string) {
    this.products = new ProductApi(baseUrl, "products");
    this.units = new UnitApi(baseUrl, "units");
    this.classifiers = new ClassifierApi(baseUrl, "classifiers");
    this.specifications = new SpecificationApi(baseUrl, "specifications");
    this.app = new AppApi(baseUrl);
  }
}

export const api = new Api(URL);
