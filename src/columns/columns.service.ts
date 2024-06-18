import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ColumnEntity } from './columns.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ColumnDTO } from './columns.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class ColumnsService {
  constructor(
    private projectsService: ProjectsService,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
  ) {}

  async createColumn(dto: ColumnDTO, project_id: number): Promise<ColumnEntity> {
    const project = await this.projectsService.getProject(project_id);
    if (!project) throw new NotFoundException('Проект не найден');
    const newColumn = this.columnsRepository.create({
      ...dto,
      project
    });
    return this.columnsRepository.save(newColumn);
  }

  async getColumns(project_id: number): Promise<ColumnEntity[]> {
    return await this.columnsRepository.find({
      where: { project: { id: project_id } },
      relations: ['tasks']
    });
  }

  async getColumn(column_id: number): Promise<ColumnEntity | null> {
    return await this.columnsRepository.findOne({
      where: {id: column_id},
      relations: ['tasks']
    });
  }

  async updateColumn(dto: ColumnDTO, column_id: number): Promise<ColumnEntity | null> {
    await this.columnsRepository.update({id: column_id}, dto);
    return await this.columnsRepository.save({id: column_id});
  }

  async deleteColumn(column_id: number): Promise<void> {
    const column = await this.columnsRepository.findOne({ where:{ id: column_id }, relations: ['tasks'] });
    if (!column) throw new NotFoundException('Столбец не найден');
    await this.columnsRepository.remove(column);
  }
}