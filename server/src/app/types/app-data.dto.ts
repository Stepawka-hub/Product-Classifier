import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { Unit } from 'src/unit/entities/unit.entity';

export interface IAppData {
  products: Product[];
  categories: Category[];
  units: Unit[];
}
