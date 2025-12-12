import { Module } from '@nestjs/common';
import { ClassifierService } from './classifier.service';
import { ClassifierController } from './classifier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassifierRepository } from './repositores/classifier.repository';
import { UnitRepository } from 'src/unit/repositories/unit.repository';
import { Classifier } from './entities/classifier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classifier])],
  controllers: [ClassifierController],
  providers: [ClassifierRepository, ClassifierService, UnitRepository],
  exports: [ClassifierService],
})
export class ClassifierModule {}
