import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { In, Repository } from 'typeorm';
import { Employee } from './employee.entity';

export class CreateCommand {
}

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ) {
  }

  async execute(command: CreateCommand): Promise<void> {
    await this.employeeRepo.save([
      new Employee({ id: 1 }),
      new Employee({ id: 2 }),
      new Employee({ id: 3 })
    ]);

    await this.taskRepo.save(new Task({ id: 1 }));
  }
}

export class AssignCommand {
}

@CommandHandler(AssignCommand)
export class AssignHandler implements ICommandHandler<AssignCommand> {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>
  ) {
  }

  async execute(command: AssignCommand): Promise<void> {
    const employees = await this.employeeRepo.find();
    await this.repo.save(new Task({
      id: 1,
      assignees: employees
    }));
  }
}

export class UnassignCommand {
}

@CommandHandler(UnassignCommand)
export class UnassignHandler implements ICommandHandler<UnassignCommand> {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>
  ) {
  }

  async execute(command: UnassignCommand): Promise<void> {
    await this.repository
      .findOne(1, { relations: ['assignees'] })
      .then(async result => {
        // Remove employee with id of 2
        result.assignees = result.assignees.filter(a =>
          a.id !== 3
        );

        await result.save();
      });
  }
}
