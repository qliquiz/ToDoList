import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnEntity } from './columns.entity';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, Project, Task, User])],
  exports: [ColumnsModule],
  providers: [ColumnsService, ProjectsService, UsersService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}