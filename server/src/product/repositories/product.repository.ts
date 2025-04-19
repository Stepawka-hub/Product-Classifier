import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateProductDto): Promise<Product> {
    const query = `
      SELECT * FROM AddRow(
        'product',
        ARRAY['name', 'parentid', 'umid'],
        ARRAY[quote_literal($1), $2::text, $3::text]
      ) AS t(id INTEGER, name VARCHAR, umid INTEGER, parentid INTEGER)`;

    const result = (await this.query(query, [
      dto.name,
      dto.parentId,
      dto.unitId,
    ])) as Product[];

    return result[0];
  }
}
