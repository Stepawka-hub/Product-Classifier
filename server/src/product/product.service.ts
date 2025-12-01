import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { ClassifierRepository } from 'src/classifier/repositores/classifier.repository';
import { UnitRepository } from 'src/unit/repositories/unit.repository';
import { Not } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private classifierRepository: ClassifierRepository,
    private unitRepository: UnitRepository,
  ) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<ProductDto>> {
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      relations: ['unit', 'parent'],
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PaginatedResponseDto(
      products.map((p) => new ProductDto(p)),
      total,
    );
  }

  async createProduct(dto: CreateProductDto): Promise<BaseResponseDto> {
    const { parentId, unitId } = dto;

    if (parentId) {
      const classifierExists = await this.classifierRepository.findOne({
        where: { id: parentId },
      });
      if (!classifierExists) {
        return BaseResponseDto.Error('Указанная категория не найдена');
      }
    }

    if (unitId) {
      const unitExists = await this.unitRepository.findOne({
        where: { id: unitId },
      });
      if (!unitExists) {
        return BaseResponseDto.Error('Указанная ЕИ не найдена');
      }
    }

    return await this.productRepository.createProduct(dto);
  }

  async updateProduct(dto: UpdateProductDto): Promise<BaseResponseDto> {
    try {
      const { id, name, parentName, unitName } = dto;
      const isProductExist = await this.productRepository.findOne({
        where: {
          name,
          id: Not(id),
        },
      });

      if (isProductExist) {
        return BaseResponseDto.Error(
          'Изделие с таким названием уже существует!',
        );
      }

      const classifier = await this.classifierRepository.findOne({
        where: { name: parentName },
      });
      if (!classifier) {
        return BaseResponseDto.Error('Указанной категории не существует!');
      }

      const unit = await this.unitRepository.findOne({
        where: { name: unitName },
      });
      if (!unit) {
        return BaseResponseDto.Error('Указанной ЕИ не существует!');
      }

      const updateResult = await this.productRepository.update(
        { id },
        { name, parent: classifier, unit },
      );

      if (updateResult.affected === 0) {
        return BaseResponseDto.Error('Запись не найдена или не была изменена!');
      }

      return BaseResponseDto.Success();
    } catch (error) {
      return BaseResponseDto.Error(
        'Ошибка при обновлении записи: ' + getErrorMessage(error),
      );
    }
  }

  async deleteProduct(id: number): Promise<BaseResponseDto> {
    return await this.productRepository.deleteProduct(id);
  }
}
