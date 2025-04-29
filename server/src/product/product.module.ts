import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { Category } from 'src/category/entities/category.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { CategoryRepository } from 'src/category/repositores/category.repository';
import { UnitRepository } from 'src/unit/repositories/unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Unit])],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    ProductService,
    CategoryRepository,
    UnitRepository,
  ],
  exports: [ProductService],
})
export class ProductModule {}
