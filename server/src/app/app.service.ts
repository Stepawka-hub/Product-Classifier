import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClassifierService } from '../classifier/classifier.service';
import { ProductService } from '../product/product.service';
import { UnitService } from '../unit/unit.service';
import { IAppData } from './dto/app-data.dto';

@Injectable()
export class AppService {
  constructor(
    private dataSource: DataSource,
    private productService: ProductService,
    private classifierService: ClassifierService,
    private unitService: UnitService,
  ) {}

  async fillData(): Promise<IAppData> {
    // Вызываем процедуру заполнения данных
    await this.seedDatabase();

    const [products, classifiers, units] = await Promise.all([
      this.productService.findAllWithPagination(),
      this.classifierService.findAllWithPagination(),
      this.unitService.findAllWithPagination(),
    ]);

    return { products, classifiers, units };
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
