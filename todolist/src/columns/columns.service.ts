import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ProjectsService } from 'src/projects/projects.service';
import { ColumnEntity } from './columns.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ColumnDTO } from './columns.dto';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ColumnsService {
  constructor(
    private projectsService: ProjectsService,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async createColumn(dto: ColumnDTO, project_id: number, user: User): Promise<ColumnEntity> {
    const project: Project = await this.projectsService.getProject(project_id, user);
    const bookedColumn: ColumnEntity = await this.columnsRepository.findOne({ where: { order: dto.order } });
    if (bookedColumn) throw new BadRequestException('Некорректное значение порядка');
    const newColumn: ColumnEntity = this.columnsRepository.create({
      ...dto,
      project
    });
    return this.columnsRepository.save(newColumn);
  }

  async getColumns(project_id: number, user: User): Promise<ColumnEntity[]> {
    return await this.columnsRepository.find({
      where: { project: { id: project_id, user: { id: user.id } } },
      relations: ['tasks'],
      order: { order: 'ASC' }
    });
  }

  async getColumn(column_id: number, user: User): Promise<ColumnEntity | null> {
    const column: ColumnEntity = await this.columnsRepository.findOne({
      where: { id: column_id },
      relations: ['project.user']
    });
    if (!column || column.project.user.id !== user.id) throw new NotFoundException('Столбец не найден или недоступен');
    return await this.columnsRepository.findOne({
      where: { id: column_id },
      relations: ['tasks']
    });
  }

  async updateColumn(dto: ColumnDTO, column_id: number, user: User): Promise<ColumnEntity | null> {
    let column: ColumnEntity = await this.columnsRepository.findOne({
      where: { id: column_id },
      relations: ['project.user']
    });
    if (!column || column.project.user.id !== user.id) throw new NotFoundException('Столбец не найден или недоступен');
    await this.moveColumn(column_id, dto.order, user);
    await this.columnsRepository.update({ id: column_id }, dto);
    return await this.columnsRepository.save({ id: column_id });
  }
  
  async moveColumn(column_id: number, new_order: number, user: User): Promise<ColumnEntity | null> {
    const column: ColumnEntity = await this.columnsRepository.findOne({
      where: { id: column_id },
      relations: ['project.user'],
    });
    if (!column || column.project.user.id !== user.id) throw new NotFoundException('Столбец не найден или недоступен');
    const columns = await this.columnsRepository.find({
      where: { project: { id: column.project.id } },
      order: { order: 'ASC' }
    });
    if (column.order < new_order) {
      for (let col of columns) {
        if (column.order < col.order && col.order <= new_order) {
          col.order--;
          await this.columnsRepository.save(col);
        }
      }
    } else {
      for (let col of columns) {
        if (col.order >= new_order && col.order < column.order) {
          col.order++;
          await this.columnsRepository.save(col);
        }
      }
    }
    column.order = new_order;
    return await this.columnsRepository.save(column);
  }
  
  async deleteColumn(column_id: number, user: User): Promise<void> {
    const column: ColumnEntity = await this.columnsRepository.findOne({
      where: { id: column_id },
      relations: ['project.user']
    });
    if (!column || column.project.user.id !== user.id) throw new NotFoundException('Столбец не найден или недоступен');
    await this.columnsRepository.remove(column);
  }
}