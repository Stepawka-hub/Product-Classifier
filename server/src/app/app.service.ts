import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { UnitService } from '../unit/unit.service';
import { IAppData } from './types/app-data.dto';

@Injectable()
export class AppService {
  constructor(
    private dataSource: DataSource,
    private productService: ProductService,
    private categoryService: CategoryService,
    private unitService: UnitService,
  ) {}

  async fillData(): Promise<IAppData> {
    // Вызываем процедуру заполнения данных
    await this.seedDatabase();

    const [products, categories, units] = await Promise.all([
      this.productService.findAll(),
      this.categoryService.findAll(),
      this.unitService.findAll(),
    ]);

    return { products, categories, units };
  }

  private async seedDatabase(): Promise<void> {
    await this.dataSource.query('CALL seed_database()');
  }
}
