import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoryService.findAllWithPagination(page, limit);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete()
  deleteCategory(@Body() id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
