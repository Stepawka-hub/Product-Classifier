import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return await this.unitRepository.find();
  }

  async createUnit(createUnitDto: CreateUnitDto): Promise<Unit> {
    const query = `
    SELECT * FROM AddRow(
      'unitmeasurement',
      ARRAY['name'],
      ARRAY[E'\\'' || $1 || E'\\'']
    ) AS t(ID INTEGER, name VARCHAR)`;

    const result = (await this.unitRepository.query(query, [
      createUnitDto.name,
    ])) as Unit[];

    return result[0];
  }
}
