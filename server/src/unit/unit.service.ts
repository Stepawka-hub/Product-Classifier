import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './entities/unit.entity';
import { UnitRepository } from './repositories/entity.repository';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class UnitService {
  constructor(private unitRepository: UnitRepository) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<Unit>> {
    const skip = (page - 1) * limit;
    const [units, total] = await this.unitRepository.findAndCount({
      skip,
      take: limit,
    });

    return new PaginatedResponseDto(units, total);
  }

  async createUnit(dto: CreateUnitDto): Promise<BaseResponseDto> {
    return await this.unitRepository.createWithAddRow(dto);
  }
}
