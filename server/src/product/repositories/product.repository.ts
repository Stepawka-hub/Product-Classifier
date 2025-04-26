import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  private tableName: string;

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
    this.tableName = 'product';
  }

  async createProduct(dto: CreateProductDto): Promise<BaseResponseDto> {
    const query = `
      SELECT AddRow(
        $1::text,
        ARRAY['name', 'parentid', 'umid'],
        ARRAY[quote_literal($2), $3::text, $4::text])`;
    const { name, parentId, unitId } = dto;

    try {
      const isExist = await this.findOne({ where: { name } });
      if (isExist) {
        return BaseResponseDto.Error(
          getErrorMessage('Данный продукт уже существует!'),
        );
      }
      await this.query(query, [this.tableName, name, parentId, unitId]);
      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }

  async updateProduct(dto: UpdateProductDto): Promise<BaseResponseDto> {
    const query = `
      SELECT AddRow(
        $1::text,
        ARRAY['name'],
        ARRAY[quote_literal($2)]
      )`;
    const { name } = dto;

    try {
      const isExist = await this.findOne({ where: { name } });
      if (isExist) {
        return BaseResponseDto.Error(
          getErrorMessage('Данная ЕИ уже существует!'),
        );
      }

      await this.query(query, [this.tableName, name]);
      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }

  async deleteProduct(id: number): Promise<BaseResponseDto> {
    const query = `SELECT DeleteRows($1, 'id', $2)`;

    try {
      const product = await this.findOne({
        where: { id },
      });

      if (!product || !id) {
        return BaseResponseDto.Error('Изделие не найдено!');
      }

      const [res] = (await this.query(query, [this.tableName, String(id)])) as [
        { deleterows: boolean },
      ];

      if (!res.deleterows) {
        return BaseResponseDto.Error('Не удалось удалить изделие!');
      }

      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
