import { Module, forwardRef } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { TasksController } from './tasks.controller';
import { ColumnsService } from 'src/columns/columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { UsersService } from 'src/users/users.service';
import { ColumnEntity } from 'src/columns/columns.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Project } from 'src/projects/projects.entity';
import { Task } from './tasks.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, ColumnEntity, Project, User]), forwardRef(() => AuthModule)],
  providers: [TasksService, ColumnsService, ProjectsService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}