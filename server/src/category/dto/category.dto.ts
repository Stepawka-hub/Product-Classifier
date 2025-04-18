import { Category } from '../entities/category.entity';

export class CategoryDto {
  id: number;
  name: string;
  unitName: string | null;
  parentName: string | null;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.unitName = category.unit?.name || null;
    this.parentName = category.parent?.name || null;
  }
}
