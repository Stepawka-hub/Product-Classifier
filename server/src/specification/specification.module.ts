import { Module } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { SpecificationController } from './specification.controller';
import { SpecificationRepository } from './repositories/specification.repository';
import { Specification } from './entities/specification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specification, Product])],
  controllers: [SpecificationController],
  providers: [SpecificationService, SpecificationRepository],
})
export class SpecificationModule {}
