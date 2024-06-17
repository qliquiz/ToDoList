import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { User } from 'src/users/users.entity';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Task } from 'src/tasks/tasks.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, ColumnEntity, Task]), AuthModule],
  exports: [ProjectsModule],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}