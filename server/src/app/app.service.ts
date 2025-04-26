import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { UnitService } from '../unit/unit.service';
import { IAppData } from './dto/app-data.dto';

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
      this.productService.findAllWithPagination(),
      this.categoryService.findAllWithPagination(),
      this.unitService.findAllWithPagination(),
    ]);

    return { products, categories, units };
  }

  async clearData() {
    try {
      await this.clearDatabase();
    } catch {
      throw new HttpException(
        { resultCode: 1, message: 'Database clearing failed' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async seedDatabase() {
    await this.dataSource.query('CALL seed_database()');
  }

  private async clearDatabase() {
    await this.dataSource.query('CALL clear_database()');
  }
}
