import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { DataSource, In, Repository } from 'typeorm';
import { ProductComponentDto } from '../dto/calculate-consumption-response.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ConsumptionResult } from '../types/types';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { ChangeProductVersionDto } from '../dto/change-product-version.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  private tableName: string;

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
    this.tableName = 'product';
  }

  async createProduct(dto: CreateProductDto): Promise<BaseResponseDto> {
    try {
      const isExist = await this.findOne({ where: { name: dto.name } });
      if (isExist) {
        return BaseResponseDto.Error(
          getErrorMessage('Данное изделие уже существует!'),
        );
      }

      // Начинаем собирать запрос
      const columns: string[] = [];
      const values: string[] = [];
      const params = [this.tableName];

      let paramIndex = 2; // $1 занят tableName

      // Обязательные поля
      columns.push('name');
      values.push(`quote_literal($${paramIndex}::text)`);
      params.push(dto.name);
      paramIndex++;

      const optionalFields = [
        { field: 'unitId', column: 'umid' },
        { field: 'parentId', column: 'parentid' },
        { field: 'classifierId', column: 'classifierid' },
        { field: 'baseProductId', column: 'baseproductid' },
      ];

      for (const { field, column } of optionalFields) {
        if (dto[field] !== undefined && dto[field] !== null) {
          columns.push(column);
          values.push(`$${paramIndex}::text`);
          params.push(String(dto[field]));
          paramIndex++;
        }
      }

      const query = `
        SELECT AddRow(
          $1::text,
          ARRAY[${columns.map((col) => `'${col}'`).join(', ')}],
          ARRAY[${values.join(', ')}]
        )`;

      await this.query(query, params);
      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }

  async updateProduct(dto: UpdateProductDto): Promise<BaseResponseDto> {
    try {
      const { id, name, unitId, parentId, classifierId, baseProductId } = dto;

      // Проверяем существование изделия по ID
      const existingProduct = await this.findOne({ where: { id } });

      if (!existingProduct) {
        return BaseResponseDto.Error(
          getErrorMessage('Изделие с указанным ID не найдено!'),
        );
      }

      const updatePromises: Promise<unknown>[] = [];
      if (name && name !== existingProduct.name) {
        updatePromises.push(
          this.query(`SELECT EditRows($1, $2, $3, $4, $5)`, [
            this.tableName,
            'name',
            name,
            'id',
            [String(id)],
          ]),
        );
      }

      // Обновляем единицу измерения если указана
      if (unitId && unitId !== existingProduct.unit?.id) {
        updatePromises.push(
          this.query(`SELECT EditRows($1, $2, $3, $4, $5)`, [
            this.tableName,
            'umid',
            String(unitId),
            'id',
            [String(id)],
          ]),
        );
      }

      // Опциональные поля
      const optionalUpdates = [
        { field: 'parentId', column: 'parentid', value: parentId },
        { field: 'classifierId', column: 'classifierid', value: classifierId },
        {
          field: 'baseProductId',
          column: 'baseproductid',
          value: baseProductId,
        },
      ];

      for (const { column, value } of optionalUpdates) {
        if (value !== undefined) {
          const dbValue = value === null ? null : String(value);
          updatePromises.push(
            this.query(`SELECT EditRows($1, $2, $3, $4, $5)`, [
              this.tableName,
              column,
              dbValue,
              'id',
              [String(id)],
            ]),
          );
        }
      }

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
      }

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

  async calculateTotalConsumption(
    id: number,
    count: number = 1,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<ProductComponentDto> | BaseResponseDto> {
    try {
      const product = await this.findOne({
        where: { id },
      });

      if (!product || !id) {
        return BaseResponseDto.Error('Изделие не найдено!');
      }

      const result: ConsumptionResult[] = (await this.query(
        `SELECT CalculateTotalConsumption(${id}, ${count})`,
      )) as ConsumptionResult[];

      const productComponents: ProductComponentDto[] = result.map((r) => {
        const value = r['calculatetotalconsumption'];
        const parts = value.slice(1, value.length - 1).split(',');

        return {
          id: Number(parts[0]),
          name: parts[1].replace(/"/g, ''),
          count: Number(parts[2]),
          unitName: parts[3],
        };
      });

      const total = productComponents.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedData = productComponents
        .sort((a, b) => a.id - b.id)
        .slice(startIndex, endIndex);

      return new PaginatedResponseDto(paginatedData, total);
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }

  async changeProductVersion(
    dto: ChangeProductVersionDto,
  ): Promise<BaseResponseDto> {
    try {
      const { id, name, newComponentIds, newConsumptions, newForQuantities } =
        dto;

      // Проверяем существование изделия по ID
      const existingProduct = await this.findOne({ where: { id } });

      if (!existingProduct) {
        return BaseResponseDto.Error(
          getErrorMessage('Изделие с указанным ID не найдено!'),
        );
      }

      const existingComponents = await this.find({
        where: {
          id: In(newComponentIds),
        },
        select: ['id'],
      });

      const existingIds = existingComponents.map((comp) => comp.id);
      const missingIds = newComponentIds.filter(
        (id) => !existingIds.includes(id),
      );

      if (missingIds.length > 0) {
        throw new Error(`Компоненты с ID не найдены: ${missingIds.join(', ')}`);
      }

      console.log(dto);

      // Todo: добавить обёртку array или попробовать добавить ::integer[], ::number[], ::integer[]
      await this.query('SELECT ChangeProductVersion($1, $2, $3, $4, $5)', [
        id,
        name,
        newComponentIds,
        newConsumptions,
        newForQuantities,
      ]);

      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
