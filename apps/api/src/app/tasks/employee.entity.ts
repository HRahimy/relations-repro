import { BaseEntity, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Task } from './task.entity';
import { ColumnNumericTransformer } from './transformer';

@Entity('employees')
export class Employee extends BaseEntity {
  @PrimaryColumn('bigint', {
    transformer: new ColumnNumericTransformer(),
    generated: 'increment'
  })
  id: number;

  @ManyToMany(
    () => Task,
    task => task.assignees,
    { nullable: true }
  )
  assignedTo?: Task[];

  constructor(args: {
    id: number,
    assignedTo?: Task[]
  }) {
    super();
    Object.assign(this, args);
  }
}
