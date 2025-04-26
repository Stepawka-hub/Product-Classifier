import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<ProductDto>> {
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      relations: ['unit', 'parent'],
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PaginatedResponseDto(
      products.map((p) => new ProductDto(p)),
      total,
    );
  }

  async createProduct(dto: CreateProductDto): Promise<BaseResponseDto> {
    return await this.productRepository.createProduct(dto);
  }

  async updateProduct(dto: UpdateProductDto): Promise<BaseResponseDto> {
    return await this.productRepository.updateProduct(dto);
  }

  async deleteProduct(id: number): Promise<BaseResponseDto> {
    return await this.productRepository.deleteProduct(id);
  }
}
