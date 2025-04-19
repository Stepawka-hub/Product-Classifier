import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositores/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find({
      relations: ['unit', 'parent'],
    });

    return categories.map((c) => new CategoryDto(c));
  }

  async createCategory(dto: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryRepository.createWithAddRow(dto);

    if (!category?.id) {
      throw new Error('Product creation failed');
    }

    return category;
  }
}
