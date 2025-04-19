import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateProductDto): Promise<ProductDto> {
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

    const createdProduct = result[0];
    if (createdProduct?.id === null) {
      throw new Error('Product creation failed');
    }

    const productWithRelations = await this.findOne({
      where: { id: createdProduct.id },
      relations: ['unit', 'parent'],
    });

    if (!productWithRelations) {
      throw new Error('Product not found after creation');
    }

    return new ProductDto(productWithRelations);
  }
}
