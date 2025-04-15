import { Category } from 'src/category/entities/category.entity';
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

  @Column({ name: 'parentid', nullable: true })
  parentId: number | null;

  @Column({ name: 'umid', nullable: true })
  unitId: number | null;

  @ManyToOne(() => Unit, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'umid' })
  unit: Unit;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parentid' })
  parent: Category;
}
