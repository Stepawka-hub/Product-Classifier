import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unitmeasurement')
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  name: string;
}
