import { Body, Controller, Get, Post, Put, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { TaskDTO } from './tasks.dto';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Post()
  createTask(@Body() dto: TaskDTO, @Query('column_id') column_id: string): Promise<Task | null> {
    return this.tasksService.createTask(dto, Number(column_id));
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Get('all')
  getTasks(@Query('column_id') column_id: string): Promise<Task[]> {
    return this.tasksService.getTasks(Number(column_id));
  }

  @ApiOperation({ summary: 'Получение задачи по id' })
  @ApiResponse({ status: 200, type: Task })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Get()
  getTask(@Query('task_id') task_id: string): Promise<Task | null> {
    return this.tasksService.getTask(Number(task_id));
  }

  @ApiOperation({ summary: 'Изменение задачи по id' })
  @ApiResponse({ status: 200, type: Task })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Put()
  updateTask(@Body() dto: TaskDTO, @Query('task_id') task_id: string): Promise<Task | null> {
    return this.tasksService.updateTask(dto, Number(task_id));
  }

  @ApiOperation({ summary: 'Удаление задачи по id' })
  @ApiResponse({ status: 200, type: null })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Delete()
  deleteTask(@Query('task_id') task_id: string): Promise<void> {
    return this.tasksService.deleteTask(Number(task_id));
  }
}