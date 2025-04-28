import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';

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

  async updateCategory(dto: UpdateCategoryDto): Promise<BaseResponseDto> {
    const { id, name, parentName, unitName, needInheritInLeaves } = dto;

    // Получаем текущее имя категории
    const currentCategory = await this.findOne({
      where: { id },
      select: ['name'],
    });

    if (!currentCategory) {
      return BaseResponseDto.Error('Категория не найдена');
    }

    // Формируем базовые параметры
    const params: any[] = ['product', this.tableName, currentCategory.name];

    // Формируем части запроса
    let query = 'SELECT EditTreeClass($1, $2, $3';

    // Добавляем параметры только если они переданы
    if (name !== undefined) {
      query += ', $4';
      params.push(name);
    } else {
      query += ', DEFAULT';
    }

    // Для named parameters нам нужно использовать другой подход
    const namedParams: Record<string, any> = {};

    if (parentName !== undefined) {
      namedParams.parentName = parentName;
    }

    if (unitName !== undefined) {
      namedParams.umName = unitName;
    }

    if (needInheritInLeaves !== undefined) {
      namedParams.needInheritInLeaves = needInheritInLeaves;
    }

    // Добавляем named parameters
    if (Object.keys(namedParams).length > 0) {
      query += Object.keys(namedParams)
        .map((key, index) => `, ${key} => $${params.length + index + 1}`)
        .join('');

      params.push(...Object.values(namedParams));
    }

    query += ')';

    try {
      await this.query(query, params);
      return BaseResponseDto.Success();
    } catch (e) {
      return BaseResponseDto.Error(
        `Ошибка при обновлении категории: ${getErrorMessage(e)}`,
      );
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
