import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsModule } from './columns/columns.module';
import { ConfigModule } from '@nestjs/config';
import { ColumnEntity } from './columns/columns.entity';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { Project } from './projects/projects.entity';
import { Module } from '@nestjs/common';
import { Task } from './tasks/tasks.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Project, ColumnEntity, Task],
      synchronize: true,
    }),
    UsersModule,
    ProjectsModule,
    ColumnsModule,
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}