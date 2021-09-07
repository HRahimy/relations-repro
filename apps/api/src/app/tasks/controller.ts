import { CommandBus } from '@nestjs/cqrs';
import { Controller, Get } from '@nestjs/common';
import { AssignCommand, CreateCommand, UnassignCommand } from './command';

@Controller('tasks')
export class TasksController {
  constructor(
    private commandBus: CommandBus
  ) {
  }

  @Get('create')
  async create() {
    await this.commandBus.execute(new CreateCommand());
  }

  @Get('unassign')
  async unassign() {
    await this.commandBus.execute(new UnassignCommand());
  }

  @Get('assign')
  async assign() {
    await this.commandBus.execute(new AssignCommand());
  }
}
