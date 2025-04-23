import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateProductDto): Promise<BaseResponseDto> {
    const query = `
      SELECT AddRow(
        'product',
        ARRAY['name', 'parentid', 'umid'],
        ARRAY[quote_literal($1), $2::text, $3::text])`;

    try {
      await this.query(query, [dto.name, dto.parentId, dto.unitId]);
      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
