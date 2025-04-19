import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createWithAddRow(dto: CreateCategoryDto): Promise<CategoryDto> {
    const query = `
      SELECT * FROM AddRow(
        'category',
        ARRAY['name', 'parentid', 'umid'],
        ARRAY[quote_literal($1), $2::text, $3::text]
      ) AS t(id INTEGER, name VARCHAR, umid INTEGER, parentid INTEGER)`;

    const result = (await this.query(query, [
      // dto.name,
      // dto.parentId,
      // dto.unitId,
    ])) as Category[];

    const createdCategory = result[0];
    if (createdCategory?.id === null) {
      throw new Error('Category creation failed');
    }

    const categoryWithRelations = await this.findOne({
      where: { id: createdCategory.id },
      relations: ['unit', 'parent'],
    });

    if (!categoryWithRelations) {
      throw new Error('Category not found after creation');
    }

    return new CategoryDto(categoryWithRelations);
  }
}
