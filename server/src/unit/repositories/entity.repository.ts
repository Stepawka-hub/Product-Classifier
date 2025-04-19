import { DataSource, Repository } from 'typeorm';
import { Unit } from '../entities/unit.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';

@Injectable()
export class UnitRepository extends Repository<Unit> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Unit, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateUnitDto): Promise<Unit> {
    const query = `
      SELECT * FROM AddRow(
        'product',
        ARRAY['name', 'parentid', 'umid'],
        ARRAY[quote_literal($1), $2::text, $3::text]
      ) AS t(id INTEGER, name VARCHAR, umid INTEGER, parentid INTEGER)`;

    const result = (await this.query(query, [dto.name])) as Unit[];

    return result[0];
  }
}
