import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositores/category.repository';
import { UnitRepository } from 'src/unit/repositories/unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService, UnitRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
