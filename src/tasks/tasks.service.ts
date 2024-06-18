import { Injectable, NotFoundException } from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { TaskDTO } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    private columnsService: ColumnsService,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(dto: TaskDTO, column_id: number): Promise<Task> {
    const column = await this.columnsService.getColumn(column_id);
    if (!column) throw new NotFoundException('Столбец не найден');
    const newTask = this.tasksRepository.create({
      ...dto,
      column
    });
    return this.tasksRepository.save(newTask);
  }

  async getTasks(column_id: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { column: { id: column_id } }
    });
  }

  async getTask(task_id: number): Promise<Task | null> {
    return await this.tasksRepository.findOneBy({ id: task_id });
  }

  async updateTask(dto: TaskDTO, task_id: number): Promise<Task | null> {
    await this.tasksRepository.update({ id: task_id }, dto);
    return await this.tasksRepository.save({ id: task_id });
  }

  async deleteTask(task_id: number): Promise<void> {
    await this.tasksRepository.delete({ id: task_id });
  }
}