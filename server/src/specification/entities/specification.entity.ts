import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity('materialspecificationposition')
export class Specification {
  @PrimaryColumn({ name: 'productid', type: 'int' })
  productId: number;

  @PrimaryColumn({ name: 'componentid', type: 'int' })
  componentId: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productid' })
  product: Product;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'componentid' })
  component: Product;

  @Column({ type: 'numeric', unsigned: true, default: 1 })
  consumption: number;

  @Column({ name: 'forquantity', type: 'int', unsigned: true, default: 1 })
  forQuantity: number;

  @Column({ type: 'boolean', default: true })
  flag: boolean;
}
