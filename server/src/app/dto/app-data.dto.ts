import { ClassifierDto } from 'src/classifier/dto/classifier.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { Unit } from 'src/unit/entities/unit.entity';

export interface IAppData {
  products: PaginatedResponseDto<ProductDto>;
  classifiers: PaginatedResponseDto<ClassifierDto>;
  units: PaginatedResponseDto<Unit>;
}
