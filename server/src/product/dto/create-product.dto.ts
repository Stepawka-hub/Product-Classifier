export class CreateProductDto {
  name: string;
  unitId: number;
  parentId?: number;
  classifierId?: number;
  baseProductId?: number;
}
