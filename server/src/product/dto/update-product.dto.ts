export class RequestUpdateProductDto {
  id: number;
  name: string;
  unitName: string | null;
  parentName: string | null;
  classifierName: string | null;
  baseProductName: string | null;
}

export class UpdateProductDto {
  id: number;
  name: string;
  unitId: number | null;
  parentId: number | null;
  baseProductId: number | null;
  classifierId: number | null;
}
