import { Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { UnitRepository } from 'src/unit/repositories/unit.repository';
import { ClassifierBaseDto, ClassifierDto } from './dto/classifier.dto';
import { CreateClassifierDto } from './dto/create-classifier.dto';
import { UpdateClassifierDto } from './dto/update-classifier.dto';
import { ClassifierRepository } from './repositores/classifier.repository';
import { ProductDto } from 'src/product/dto/product.dto';

@Injectable()
export class ClassifierService {
  constructor(
    private classifierRepository: ClassifierRepository,
    private unitRepository: UnitRepository,
  ) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<ClassifierDto>> {
    const skip = (page - 1) * limit;
    const [classifiers, total] = await this.classifierRepository.findAndCount({
      relations: ['unit', 'parent'],
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PaginatedResponseDto(
      classifiers.map((c) => new ClassifierDto(c)),
      total,
    );
  }

  async findNodes(
    id: number,
    page: number = 1,
    limit: number = 10,
    direction: boolean = false,
  ): Promise<PaginatedResponseDto<ClassifierBaseDto>> {
    const { items: classifiers, total } =
      await this.classifierRepository.findNodes(id, page, limit, direction);

    return new PaginatedResponseDto(
      classifiers.map((c) => new ClassifierBaseDto(c)),
      total,
    );
  }

  async findLeaves(
    id: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<ProductDto>> {
    const { items: leaves, total } = await this.classifierRepository.findLeaves(
      id,
      page,
      limit,
    );

    return new PaginatedResponseDto(leaves, total);
  }

  async createClassifier(dto: CreateClassifierDto): Promise<BaseResponseDto> {
    const { parentName, unitName } = dto;

    if (parentName) {
      const parentExists = await this.classifierRepository.findOne({
        where: { name: parentName },
      });
      if (!parentExists) {
        return BaseResponseDto.Error(
          'Указанная родительская категория не найдена',
        );
      }
    }

    if (unitName) {
      const unitExists = await this.unitRepository.findOne({
        where: { name: unitName },
      });
      if (!unitExists) {
        return BaseResponseDto.Error('Указанная ЕИ не найдена');
      }
    }

    return await this.classifierRepository.createClassifier(dto);
  }

  async updateClassifier(dto: UpdateClassifierDto): Promise<BaseResponseDto> {
    const { parentName, unitName } = dto;

    if (parentName) {
      const parentExists = await this.classifierRepository.findOne({
        where: { name: parentName },
      });
      if (!parentExists) {
        return BaseResponseDto.Error(
          'Указанная родительская категория не найдена',
        );
      }
    }

    if (unitName) {
      const unitExists = await this.unitRepository.findOne({
        where: { name: unitName },
      });
      if (!unitExists) {
        return BaseResponseDto.Error('Указанная ЕИ не найдена');
      }
    }

    return await this.classifierRepository.updateClassifier(dto);
  }

  async deleteClassifier(id: number): Promise<BaseResponseDto> {
    return await this.classifierRepository.deleteClassifier(id);
  }
}
