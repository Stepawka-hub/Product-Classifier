import { Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { SpecificationDto } from './dto/specification.dto';
import { createCompositeId } from './helpers';
import { SpecificationRepository } from './repositories/specification.repository';

@Injectable()
export class SpecificationService {
  constructor(private specificationRepository: SpecificationRepository) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<SpecificationDto>> {
    const skip = (page - 1) * limit;

    const [specifications, total] =
      await this.specificationRepository.findAndCount({
        relations: ['product', 'component'],
        skip,
        take: limit,
        order: { product: { id: 'ASC' } },
      });

    return new PaginatedResponseDto(
      specifications.map(
        ({ product, component, consumption, forQuantity, flag }) => ({
          id: createCompositeId(product.id, component.id),
          productName: product.name,
          componentName: component.name,
          consumption,
          forQuantity,
          flag,
        }),
      ),
      total,
    );
  }
}
