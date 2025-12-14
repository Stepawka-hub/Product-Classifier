import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import {
  RequestUpdateProductDto,
  UpdateProductDto,
} from './dto/update-product.dto';
import { getErrorMessage } from 'src/utils/error-handler';
import { ClassifierRepository } from 'src/classifier/repositores/classifier.repository';
import { UnitRepository } from 'src/unit/repositories/unit.repository';
import { Not } from 'typeorm';
import { ProductComponentDto } from './dto/calculate-consumption-response.dto';
import { ChangeProductVersionDto } from './dto/change-product-version.dto';

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
      relations: ['unit', 'parent', 'classifier', 'baseProduct'],
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PaginatedResponseDto(
      products.map((p) => ({
        ...p,
        unitName: p.unit?.name || null,
        parentName: p.parent?.name || null,
        baseProductName: p.baseProduct?.name || null,
        classifierName: p.classifier?.name || null,
        dateCreated: p.dateCreated.toISOString(),
        datePlanned: p.datePlanned.toISOString(),
        dateActual: p.dateActual?.toISOString() || null,
      })),
      total,
    );
  }

  async createProduct(dto: CreateProductDto): Promise<BaseResponseDto> {
    const { parentId, unitId, classifierId, baseProductId } = dto;

    if (parentId) {
      const parentProductExists = await this.productRepository.findOne({
        where: { id: parentId },
      });

      if (!parentProductExists) {
        return BaseResponseDto.Error(
          'Указанное родительское изделие не найдено',
        );
      }
    }

    if (baseProductId) {
      const baseProductExists = await this.productRepository.findOne({
        where: { id: baseProductId },
      });

      if (!baseProductExists) {
        return BaseResponseDto.Error('Указанное базовое изделие не найдено');
      }
    }

    if (classifierId) {
      const classifierExists = await this.classifierRepository.findOne({
        where: { id: classifierId },
      });

      if (!classifierExists) {
        return BaseResponseDto.Error('Указанный классификатор не найден');
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

  async updateProduct(dto: RequestUpdateProductDto): Promise<BaseResponseDto> {
    try {
      const {
        id,
        name,
        parentName,
        unitName,
        classifierName,
        baseProductName,
      } = dto;

      const checks = {
        duplicateName: name
          ? await this.productRepository.findOne({
              where: { name, id: Not(id) },
            })
          : null,

        relatedEntities: {
          parent: parentName
            ? await this.productRepository.findOne({
                where: { name: parentName },
              })
            : null,
          unit: unitName
            ? await this.unitRepository.findOne({ where: { name: unitName } })
            : null,
          baseProduct: baseProductName
            ? await this.productRepository.findOne({
                where: { name: baseProductName },
              })
            : null,
          classifier: classifierName
            ? await this.classifierRepository.findOne({
                where: { name: classifierName },
              })
            : null,
        },
      };

      // Проверка на дубликат имени
      if (name && checks.duplicateName) {
        return BaseResponseDto.Error(
          'Изделие с таким названием уже существует!',
        );
      }

      const validationErrors = [
        {
          name: parentName,
          entity: checks.relatedEntities.parent,
          message: 'Указанного родительского изделия не существует!',
        },
        { name: unitName, entity: checks.relatedEntities.unit, message: 'ЕИ' },
        {
          name: baseProductName,
          entity: checks.relatedEntities.baseProduct,
          message: 'Указанного базового изделия не существует!',
        },
        {
          name: classifierName,
          entity: checks.relatedEntities.classifier,
          message: 'Указанного классификатора не существует!',
        },
      ]
        .filter(({ name }) => name)
        .filter(({ entity }) => !entity)
        .map(({ message }) => message);

      if (validationErrors.length > 0) {
        return BaseResponseDto.Error(validationErrors[0]);
      }

      const updateData: UpdateProductDto = {
        id,
        name,
        unitId: checks.relatedEntities.unit?.id || null,
        parentId: checks.relatedEntities.parent?.id || null,
        baseProductId: checks.relatedEntities.baseProduct?.id || null,
        classifierId: checks.relatedEntities.classifier?.id || null,
      };

      return await this.productRepository.updateProduct(updateData);
    } catch (error) {
      return BaseResponseDto.Error(
        'Ошибка при обновлении записи: ' + getErrorMessage(error),
      );
    }
  }

  async deleteProduct(id: number): Promise<BaseResponseDto> {
    return await this.productRepository.deleteProduct(id);
  }

  async calculateTotalConsumption(
    id: number,
    count: number,
    page: number,
    limit: number,
  ): Promise<PaginatedResponseDto<ProductComponentDto> | BaseResponseDto> {
    return await this.productRepository.calculateTotalConsumption(
      id,
      count,
      page,
      limit,
    );
  }

  async changeProductVersion(dto: ChangeProductVersionDto) {
    return await this.productRepository.changeProductVersion(dto);
  }
}
