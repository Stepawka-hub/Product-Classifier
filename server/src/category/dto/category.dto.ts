import { Category } from '../entities/category.entity';

export class CategoryBaseDto {
  id: number;
  name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}

export class CategoryDto extends CategoryBaseDto {
  unitName: string | null;
  parentName: string | null;

  constructor(category: Category) {
    super(category);
    this.unitName = category.unit?.name || null;
    this.parentName = category.parent?.name || null;
  }
}
