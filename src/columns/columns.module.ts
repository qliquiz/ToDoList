import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnEntity } from './columns.entity';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, Project, Task])],
  providers: [ColumnsService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}