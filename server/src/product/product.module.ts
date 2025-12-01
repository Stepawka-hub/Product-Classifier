import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { Classifier } from 'src/classifier/entities/classifier.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { ClassifierRepository } from 'src/classifier/repositores/classifier.repository';
import { UnitRepository } from 'src/unit/repositories/unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Classifier, Unit])],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    ProductService,
    ClassifierRepository,
    UnitRepository,
  ],
  exports: [ProductService],
})
export class ProductModule {}
