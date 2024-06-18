import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ColumnsService } from 'src/columns/columns.service';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { Task } from './tasks.entity';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task, ColumnEntity, Project, User])],
  providers: [TasksService, ColumnsService, ProjectsService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}
