import { DataSource, Repository } from 'typeorm';
import { Unit } from '../entities/unit.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';

@Injectable()
export class UnitRepository extends Repository<Unit> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Unit, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateUnitDto): Promise<BaseResponseDto> {
    const query = `
    SELECT AddRow(
      'unitmeasurement',
      ARRAY['name'],
      ARRAY[quote_literal($1)]
    )`;

    try {
      await this.query(query, [dto.name]);
      return BaseResponseDto.Success();
    } catch (e: unknown) {
      return BaseResponseDto.Error(getErrorMessage(e));
    }
  }
}
