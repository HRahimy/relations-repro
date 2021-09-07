import { BaseEntity, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity('employees')
export class Employee extends BaseEntity {
  @PrimaryColumn({ nullable: false })
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
