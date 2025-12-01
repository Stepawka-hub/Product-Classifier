import { Classifier } from 'src/classifier/entities/classifier.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @ManyToOne(() => Unit, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'umid' })
  unit: Unit | null;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parentid' })
  parent: Product | null;

  @ManyToOne(() => Classifier, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'classifierid' })
  classifier: Classifier | null;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'baseproductid' })
  baseProduct: Product | null;

  @Column({ name: 'versionnumber', type: 'int', default: 1 })
  versionNumber: number;

  @Column({ name: 'isactive', type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    name: 'datecreated',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: Date;

  @Column({
    name: 'dateplanned',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  datePlanned: Date;

  @Column({
    name: 'dateactual',
    type: 'timestamp without time zone',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateActual?: Date | null;
}
