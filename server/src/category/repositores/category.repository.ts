import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateCategoryDto): Promise<BaseResponseDto> {
    const { name, parentName, unitName } = dto;
    const tableName = 'productclass';

    try {
      // Без parentName и unitName
      if (!parentName && !unitName) {
        await this.query(`SELECT AddTreeClass($1::TEXT, $2::VARCHAR)`, [
          tableName,
          name,
        ]);
      }
      // Только с unitName
      else if (!parentName && unitName) {
        await this.query(
          `SELECT AddTreeClass($1::TEXT, $2::VARCHAR, umName => quote_literal($3))`,
          [tableName, name, unitName],
        );
      }
      // Только с parentName
      else if (parentName && !unitName) {
        await this.query(
          `SELECT AddTreeClass($1::TEXT, $2::VARCHAR, quote_literal($3))`,
          [tableName, name, parentName],
        );
      }
      // С parentName и unitName
      else if (parentName && unitName) {
        await this.query(
          `SELECT AddTreeClass($1::TEXT, $2::VARCHAR, quote_literal($3), quote_literal($4))`,
          [tableName, name, parentName, unitName],
        );
      }

      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
