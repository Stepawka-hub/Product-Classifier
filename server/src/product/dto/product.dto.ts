import { Product } from '../entities/product.entity';

export class ProductDto {
  id: number;
  name: string;
  unitName: string | null;
  parentName: string | null;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.unitName = product.unit?.name || null;
    this.parentName = product.parent?.name || null;
  }
}
