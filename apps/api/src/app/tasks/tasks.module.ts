import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Task } from './task.entity';
import { AssignHandler, CreateHandler, UnassignHandler } from './command';
import { TasksController } from './controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Employee,
      Task
    ])
  ],
  controllers: [TasksController],
  providers: [
    CreateHandler,
    UnassignHandler,
    AssignHandler
  ]
})
export class TasksModule {
}
