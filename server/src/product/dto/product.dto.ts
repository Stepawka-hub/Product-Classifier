export class ProductDto {
  id: number;
  name: string;
  unitName: string | null;
  parentName: string | null;
  baseProductName: string | null;
  classifierName: string | null;
  versionNumber: number;
  isActive: boolean;
  dateCreated: string;
  datePlanned: string;
  dateActual: string | null;
}
