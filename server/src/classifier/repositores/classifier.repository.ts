import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateClassifierDto } from 'src/classifier/dto/create-classifier.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { addNamedParametersToQuery } from 'src/utils/sql.utils';
import { DataSource, Repository } from 'typeorm';
import { UpdateClassifierDto } from '../dto/update-classifier.dto';
import { Classifier } from '../entities/classifier.entity';
import { TerminalProduct } from 'src/product/types/types';
import { ClassifierDto } from '../dto/classifier.dto';

@Injectable()
export class ClassifierRepository extends Repository<Classifier> {
  private tableName: string;

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Classifier, dataSource.createEntityManager());
    this.tableName = 'objectclassifier';
  }

  async createClassifier(dto: CreateClassifierDto): Promise<BaseResponseDto> {
    const { name, parentName, unitName } = dto;

    try {
      const isExist = await this.findOne({ where: { name } });
      if (isExist) {
        return BaseResponseDto.Error(
          getErrorMessage('Данный классификатор уже существует!'),
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

  async updateClassifier(dto: UpdateClassifierDto): Promise<BaseResponseDto> {
    const { id, name, parentName, unitName, needInheritInLeaves } = dto;

    const currentClassifier = await this.findOne({
      where: { id },
      select: ['name'],
    });

    if (!currentClassifier) {
      return BaseResponseDto.Error('Классификатор не найден');
    }

    const params: any[] = [
      'product',
      this.tableName,
      currentClassifier.name,
      name,
    ];

    const query = 'SELECT EditTreeClass($1, $2, $3, $4';

    // Добавляем оставшиеся параметры
    const namedParams: Record<string, unknown> = {};

    if (parentName) {
      const isExistCycle = await this.checkCycle(id, parentName);
      if (isExistCycle) {
        return BaseResponseDto.Error(
          'Нельзя выбрать текущий классификатор или её дочерний классификатор как родительский',
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

    try {
      await this.query(finalQuery, finalParams);
      return BaseResponseDto.Success();
    } catch (e) {
      return BaseResponseDto.Error(
        `Ошибка при обновлении классификатора: ${getErrorMessage(e)}`,
      );
    }
  }

  async deleteClassifier(id: number): Promise<BaseResponseDto> {
    const query = `SELECT DeleteRows($1, 'id', $2)`;

    try {
      const classifier = await this.findOne({
        where: { id },
      });

      if (!classifier || !id) {
        return BaseResponseDto.Error('Классификатор не найден!');
      }

      const [res] = (await this.query(query, [this.tableName, String(id)])) as [
        { deleterows: boolean },
      ];

      if (!res.deleterows) {
        return BaseResponseDto.Error('Не удалось удалить классификатор!');
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
  ): Promise<PaginatedResponseDto<Classifier>> {
    const query = "SELECT * FROM GetTree($1, 'id', $2, $3)";

    const res = (await this.query(query, [
      this.tableName,
      String(id),
      direction,
    ])) as Classifier[];

    const filteredData = res.filter((e) => String(e.id) !== String(id));
    const total = filteredData.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData
      .sort((a, b) => a.id - b.id)
      .slice(startIndex, endIndex);

    return new PaginatedResponseDto(paginatedData, total);
  }

  async findLeaves(
    id: number,
    page: number,
    limit: number,
  ): Promise<PaginatedResponseDto<ClassifierDto>> {
    const query = "SELECT * FROM GetLeaves('objectclassifier', $1, 'id', $2)";

    const res = (await this.query(query, [
      this.tableName,
      String(id),
    ])) as TerminalProduct[];

    const total = res.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = res
      .sort((a, b) => a.id - b.id)
      .slice(startIndex, endIndex);

    const leaves = paginatedData.map((p) => ({
      id: p.id,
      name: p.name,
      parentName: p.parentname,
      unitName: p.umname,
    }));

    return new PaginatedResponseDto(leaves, total);
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
