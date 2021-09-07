import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'mypassword',
      database: process.env.DB_NAME || 'postgres',
      // entities: ['src/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
      // logging: true
    }),
    TasksModule
  ]
})
export class AppModule {
}
