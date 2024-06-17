import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ColumnEntity } from './columns.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import { ColumnDTO } from './columns.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ColumnsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createColumn(dto: ColumnDTO, user_id: number, project_title: string): Promise<ColumnEntity> {
    const user = await this.usersService.getUser(user_id);
    const project = await this.projectsRepository.findOne({
      where: { id: createColumnDto.projectId, user },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createColumnDto.projectId} not found`);
    }

    const newColumn = this.columnsRepository.create({
      ...createColumnDto,
      project,
      order: project.columns.length,
      tasks: [],
    });

    return this.columnsRepository.save(newColumn);
  }
}
