import { Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';
import { UnitRepository } from './repositories/unit.repository';

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

  async updateUnit(dto: UpdateUnitDto): Promise<BaseResponseDto> {
    try {
      const { id, name } = dto;
      const isExist = await this.unitRepository.findOne({ where: { name } });

      if (isExist) {
        return BaseResponseDto.Error('ЕИ с таким названием уже существует!');
      }

      const updateResult = await this.unitRepository.update({ id }, { name });

      if (updateResult.affected === 0) {
        return BaseResponseDto.Error('Запись не найдена или не была изменена!');
      }

      return BaseResponseDto.Success();
    } catch (error) {
      return BaseResponseDto.Error(
        'Ошибка при обновлении записи: ' + getErrorMessage(error),
      );
    }
  }

  async deleteUnit(id: number): Promise<BaseResponseDto> {
    return await this.unitRepository.deleteUnit(id);
  }
}
