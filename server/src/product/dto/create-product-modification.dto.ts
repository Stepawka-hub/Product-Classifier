export class CreateProductModificationDto {
  name: string;
  baseProductId: number;
  newComponentIds: number[];
  newConsumptions: number[];
  newForQuantities: number[];
}
