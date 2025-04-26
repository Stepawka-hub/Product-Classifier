import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './entities/unit.entity';
import { UnitRepository } from './repositories/unit.repository';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

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
      order: { id: 'ASC' },
    });

    return new PaginatedResponseDto(units, total);
  }

  async createUnit(dto: CreateUnitDto): Promise<BaseResponseDto> {
    return await this.unitRepository.createUnit(dto);
  }

  async updateUnit(dto: UpdateProductDto): Promise<BaseResponseDto> {
    return await this.unitRepository.updateUnit(dto);
  }

  async deleteUnit(id: number): Promise<BaseResponseDto> {
    return await this.unitRepository.deleteUnit(id);
  }
}
