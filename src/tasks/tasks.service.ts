import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from './tasks.dto';
import { Task } from './tasks.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    private columnsService: ColumnsService,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async createTask(dto: TaskDTO, column_id: number, user: User): Promise<Task> {
    const column: ColumnEntity = await this.columnsService.getColumn(column_id, user);
    const bookedTask: Task = await this.tasksRepository.findOne({ where: { order: dto.order } });
    if (bookedTask) throw new BadRequestException('Некорректное значение порядка');
    const newTask: Task = this.tasksRepository.create({
      ...dto,
      column
    });
    return this.tasksRepository.save(newTask);
  }

  async getTasks(column_id: number, user: User): Promise<Task[]> {
    const column: ColumnEntity = await this.columnsRepository.findOne({
      where: { id: column_id },
      relations: ['project.user']
    });
    if (!column || column.project.user.id !== user.id) throw new NotFoundException('Задача не найдена или недоступна');
    return await this.tasksRepository.find({
      where: { column: { id: column_id } },
      order: { order: 'ASC' }
    });
  }

  async getTask(task_id: number, user: User): Promise<Task | null> {
    const task: Task = await this.tasksRepository.findOne({
      where: { id: task_id },
      relations: ['column.project.user']
    });
    if (!task || task.column.project.user.id !== user.id) throw new NotFoundException('Задача не найдена или недоступена');
    return task;
  }

  async updateTask(dto: TaskDTO, task_id: number, user: User): Promise<Task | null> {
    const task: Task = await this.tasksRepository.findOne({
      where: { id: task_id},
      relations: ['column.project.user']
    });
    if (!task || task.column.project.user.id !== user.id) throw new NotFoundException('Задача не найдена или недоступена');
    await this.moveTask(task_id, dto.order, user);
    await this.tasksRepository.update({ id: task_id }, dto);
    return await this.tasksRepository.save({ id: task_id });
  }

  async moveTask(task_id: number, new_order: number, user: User): Promise<void> {
    const task: Task = await this.tasksRepository.findOne({
      where: { id: task_id },
      relations: ['column.project.user'],
    });
    if (!task || task.column.project.user.id !== user.id) throw new NotFoundException('Задача не найдена или недоступена');
    const tasks: Task[] = await this.tasksRepository.find({
      where: { column: { id: task.column.id } },
      order: { order: 'ASC' }
    });
    tasks.filter(t => t.id !== task.id);
    const sameOrderTask: Task = tasks.find(t => t.order === new_order);
    if (sameOrderTask) {
      const currentIndex: number = tasks.indexOf(sameOrderTask);
      const tasksToReorder: Task[] = tasks.slice(currentIndex);
      tasksToReorder.forEach(async (t, index) => {
          t.order = new_order + index + 1;
          await this.tasksRepository.save(t);
      });
    }
    task.order = new_order;
    await this.tasksRepository.save(task)
    tasks.push(task);
    tasks.sort((a, b) => a.order - b.order);
  }

  async deleteTask(task_id: number, user: User): Promise<void> {
    const task: Task = await this.tasksRepository.findOne({
      where: { id: task_id},
      relations: ['column.project.user']
    });
    if (!task || task.column.project.user.id !== user.id) throw new NotFoundException('Задача не найдена или недоступена');
    await this.tasksRepository.remove(task);
  }
}