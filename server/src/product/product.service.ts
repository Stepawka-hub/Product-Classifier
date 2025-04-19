import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from 'src/product/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      relations: ['unit', 'parent'],
    });

    return products.map((p) => new ProductDto(p));
  }

  async createProduct(dto: CreateProductDto): Promise<ProductDto> {
    const product = await this.productRepository.createWithAddRow(dto);

    if (!product?.id) {
      throw new Error('Product creation failed');
    }

    return product;
  }
}
