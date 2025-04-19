import { CategoryDto } from 'src/category/dto/category.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { Unit } from 'src/unit/entities/unit.entity';

export interface IAppData {
  products: ProductDto[];
  categories: CategoryDto[];
  units: Unit[];
}
