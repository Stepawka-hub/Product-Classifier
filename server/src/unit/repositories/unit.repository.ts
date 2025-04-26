import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { DataSource, Repository } from 'typeorm';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { Unit } from '../entities/unit.entity';
import { UpdateUnitDto } from '../dto/update-unit.dto';

@Injectable()
export class UnitRepository extends Repository<Unit> {
  public tableName: string;

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Unit, dataSource.createEntityManager());
    this.tableName = 'unitmeasurement';
  }

  async createUnit(dto: CreateUnitDto): Promise<BaseResponseDto> {
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

  async updateUnit(dto: UpdateUnitDto): Promise<BaseResponseDto> {
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

  async deleteUnit(id: number): Promise<BaseResponseDto> {
    const query = `SELECT DeleteRows($1, 'id', $2)`;

    try {
      const unit = await this.findOne({
        where: { id },
      });

      if (!unit || !id) {
        return BaseResponseDto.Error('ЕИ не найдена!');
      }

      const [res] = (await this.query(query, [this.tableName, String(id)])) as [
        { deleterows: boolean },
      ];

      if (!res.deleterows) {
        return BaseResponseDto.Error('Не удалось удалить ЕИ!');
      }

      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
