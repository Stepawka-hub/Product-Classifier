import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  private tableName: string;

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
    this.tableName = 'productclass';
  }

  async createCategory(dto: CreateCategoryDto): Promise<BaseResponseDto> {
    const { name, parentName, unitName } = dto;

    try {
      const isExist = await this.findOne({ where: { name } });
      if (isExist) {
        return BaseResponseDto.Error(
          getErrorMessage('Данная категория уже существует!'),
        );
      }

      // Без parentName и unitName
      if (!parentName && !unitName) {
        await this.query(`SELECT AddTreeClass($1::TEXT, $2::VARCHAR)`, [
          this.tableName,
          name,
        ]);
      }
      // Только с unitName
      else if (!parentName && unitName) {
        await this.query(
          `SELECT AddTreeClass($1::TEXT, $2::VARCHAR, umName => quote_literal($3))`,
          [this.tableName, name, unitName],
        );
      }
      // Только с parentName
      else if (parentName && !unitName) {
        await this.query(
          `SELECT AddTreeClass($1::TEXT, $2::VARCHAR, quote_literal($3))`,
          [this.tableName, name, parentName],
        );
      }
      // С parentName и unitName
      else if (parentName && unitName) {
        await this.query(
          `SELECT AddTreeClass($1::TEXT, $2::VARCHAR, quote_literal($3), quote_literal($4))`,
          [this.tableName, name, parentName, unitName],
        );
      }

      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }

  async deleteCategory(id: number): Promise<BaseResponseDto> {
    const query = `SELECT DeleteRows($1, 'id', $2)`;

    try {
      const category = await this.findOne({
        where: { id },
      });

      if (!category || !id) {
        return BaseResponseDto.Error('Категория не найдена!');
      }

      const [res] = (await this.query(query, [this.tableName, String(id)])) as [
        { deleterows: boolean },
      ];

      if (!res.deleterows) {
        return BaseResponseDto.Error('Не удалось удалить категорию!');
      }

      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
