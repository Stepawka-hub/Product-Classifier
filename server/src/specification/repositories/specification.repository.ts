import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Specification } from '../entities/specification.entity';

@Injectable()
export class SpecificationRepository extends Repository<Specification> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Specification, dataSource.createEntityManager());
  }
}
