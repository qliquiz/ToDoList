import { Module, forwardRef } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ProjectsService } from 'src/projects/projects.service';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ColumnEntity } from './columns.entity';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import { Task } from 'src/tasks/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, Project, Task, User]), forwardRef(() => AuthModule)],
  exports: [ColumnsModule],
  providers: [ColumnsService, ProjectsService, UsersService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}