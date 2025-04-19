import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      relations: ['unit', 'parent'],
    });

    return products.map((p) => new ProductDto(p));
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDto> {
    const query = `
    SELECT * FROM AddRow(
      'product',
      ARRAY['name', 'parentid', 'umid'], 
      ARRAY[quote_literal($1), $2::text, $3::text]
    ) AS t(id INTEGER, name VARCHAR, umid INTEGER, parentid INTEGER)`;

    const result = (await this.productRepository.query(query, [
      createProductDto.name,
      createProductDto.parentId,
      createProductDto.unitId,
    ])) as Product[];

    const product = result[0];
    if (product.id === null) {
      throw new Error('Error adding product');
    }

    const fullProduct = await this.productRepository.findOne({
      where: { id: product.id },
      relations: ['unit', 'parent'],
    });

    if (!fullProduct) {
      throw new Error('Product not found after creation');
    }

    return new ProductDto(fullProduct);
  }
}
