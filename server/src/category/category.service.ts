import { Injectable, Logger } from '@nestjs/common';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { UnitRepository } from 'src/unit/repositories/unit.repository';
import { CategoryBaseDto, CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositores/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private unitRepository: UnitRepository,
  ) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<CategoryDto>> {
    const skip = (page - 1) * limit;
    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: ['unit', 'parent'],
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PaginatedResponseDto(
      categories.map((c) => new CategoryDto(c)),
      total,
    );
  }

  async findNodes(
    id: number,
    page: number = 1,
    limit: number = 10,
    direction: boolean = false,
  ): Promise<PaginatedResponseDto<CategoryBaseDto>> {
    const { items: categories, total } =
      await this.categoryRepository.findNodes(id, page, limit, direction);

    new Logger().log(total);
    new Logger().log(page);
    new Logger().log(limit);

    return new PaginatedResponseDto(
      categories.map((c) => new CategoryBaseDto(c)),
      total,
    );
  }

  async createCategory(dto: CreateCategoryDto): Promise<BaseResponseDto> {
    const { parentName, unitName } = dto;

    if (parentName) {
      const parentExists = await this.categoryRepository.findOne({
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

    return await this.categoryRepository.createCategory(dto);
  }

  async updateCategory(dto: UpdateCategoryDto): Promise<BaseResponseDto> {
    const { parentName, unitName } = dto;

    if (parentName) {
      const parentExists = await this.categoryRepository.findOne({
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

    return await this.categoryRepository.updateCategory(dto);
  }

  async deleteCategory(id: number): Promise<BaseResponseDto> {
    return await this.categoryRepository.deleteCategory(id);
  }
}
