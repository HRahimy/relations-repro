import { BaseEntity, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { ColumnNumericTransformer } from './transformer';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryColumn('bigint', {
    transformer: new ColumnNumericTransformer(),
    generated: 'increment'
  })
  id: number;

  @ManyToMany(
    () => Employee,
    employee => employee.assignedTo,
    { nullable: true, cascade: true }
  )
  @JoinTable()
  assignees?: Employee[];

  constructor(args: {
    id: number,
    assignees?: Employee[]
  }) {
    super();
    Object.assign(this, args);
  }
}
