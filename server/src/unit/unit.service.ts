import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './entities/unit.entity';
import { UnitRepository } from './repositories/entity.repository';

@Injectable()
export class UnitService {
  constructor(private unitRepository: UnitRepository) {}

  async findAll(): Promise<Unit[]> {
    return await this.unitRepository.find();
  }

  async createUnit(dto: CreateUnitDto): Promise<Unit> {
    const unit = await this.unitRepository.createWithAddRow(dto);

    if (!unit?.id) {
      throw new Error('Unit creation failed');
    }

    return unit;
  }
}
