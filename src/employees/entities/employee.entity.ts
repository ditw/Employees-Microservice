import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2})
  salary: number;

  @Column({ length: 3, type: 'varchar' })
  currency: string;

  @Column({ length: 255, type: 'varchar' })
  department: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  sub_department: string;

  @Column({ type: 'boolean', default: true })
  on_contract: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;  

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDateTime: Date; 
}