import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { addNamedParametersToQuery } from 'src/utils/sql.utils';
import { DataSource, Repository } from 'typeorm';
import { UpdateCategoryDto } from '../dto/update-category.dto';
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

  async updateCategory(dto: UpdateCategoryDto): Promise<BaseResponseDto> {
    const { id, name, parentName, unitName, needInheritInLeaves } = dto;

    const currentCategory = await this.findOne({
      where: { id },
      select: ['name'],
    });

    if (!currentCategory) {
      return BaseResponseDto.Error('Категория не найдена');
    }

    const params: any[] = [
      'product',
      this.tableName,
      currentCategory.name,
      name,
    ];

    const query = 'SELECT EditTreeClass($1, $2, $3, $4';

    // Добавляем оставшиеся параметры
    const namedParams: Record<string, unknown> = {};

    if (parentName) {
      const isExistCycle = await this.checkCycle(id, parentName);
      if (isExistCycle) {
        return BaseResponseDto.Error(
          'Нельзя выбрать текущую категорию или её подкатегории как родительские',
        );
      }
      namedParams.parentName = parentName;
    }

    if (unitName) {
      namedParams.umName = unitName;
    }

    if (!needInheritInLeaves) {
      namedParams.needInheritInLeaves = needInheritInLeaves;
    }

    // Добавляем named parameters
    const { query: finalQuery, params: finalParams } =
      addNamedParametersToQuery(query, params, namedParams);

    new Logger().log(finalQuery);

    try {
      await this.query(finalQuery, finalParams);
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

  async findNodes(
    id: number,
    page: number,
    limit: number,
    direction: boolean = false,
  ): Promise<PaginatedResponseDto<Category>> {
    const query = "SELECT * FROM GetTree($1, 'id', $2, $3)";

    const res = (await this.query(query, [
      this.tableName,
      String(id),
      direction,
    ])) as Category[];

    const filteredData = res.filter((e) => String(e.id) !== String(id));
    const total = filteredData.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData
      .sort((a, b) => a.id - b.id)
      .slice(startIndex, endIndex);

    return new PaginatedResponseDto(paginatedData, total);
  }

  private async checkCycle(id: number, parentName: string): Promise<boolean> {
    const parent = await this.findOne({
      where: { name: parentName },
      select: ['id'],
    });

    const [result] = (await this.query('SELECT IsExistCycle($1, $2, $3)', [
      this.tableName,
      String(id),
      String(parent?.id),
    ])) as [{ isexistcycle: boolean }];

    return !!result.isexistcycle;
  }
}
