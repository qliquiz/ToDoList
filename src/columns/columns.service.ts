import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ColumnEntity } from './columns.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import { ColumnDTO } from './columns.dto';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class ColumnsService {
  constructor(
    private projectsService: ProjectsService,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async createColumn(dto: ColumnDTO, user_id: number, project_title: string): Promise<ColumnEntity> {
    const project = await this.projectsService.getProject(user_id, project_title);
    if (!project) throw new NotFoundException('Проект не найден');
    const newColumn = this.columnsRepository.create({
      ...dto,
      order: project.columns.length,
      project,
      tasks: [],
    });
    return this.columnsRepository.save(newColumn);
  }
}
