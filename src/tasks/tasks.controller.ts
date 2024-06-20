import { Body, Controller, Get, Post, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/auth/user.decorator';
import { TaskDTO } from './tasks.dto';
import { Task } from './tasks.entity';
import { User } from 'src/users/users.entity';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() dto: TaskDTO, @Query('column_id') column_id: string, @CurrentUser() user: User): Promise<Task | null> {
    return this.tasksService.createTask(dto, +column_id, user);
  }

  @ApiOperation({ summary: 'Получение всех задач пользователя' })
  @ApiResponse({ status: 200, type: [Task] })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getTasks(@Query('column_id') column_id: string, @CurrentUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(+column_id, user);
  }

  @ApiOperation({ summary: 'Получение задачи по id' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Get()
  getTask(@Query('task_id') task_id: string, @CurrentUser() user: User): Promise<Task | null> {
    return this.tasksService.getTask(+task_id, user);
  }

  @ApiOperation({ summary: 'Изменение задачи по id' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Put()
  updateTask(@Body() dto: TaskDTO, @Query('task_id') task_id: string, @CurrentUser() user: User): Promise<Task | null> {
    return this.tasksService.updateTask(dto, +task_id, user);
  }

  @ApiOperation({ summary: 'Перемещение столбца' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Put('move')
  moveColumn(@Query('task_id') task_id: string, @Query('new_order') new_order: string, @CurrentUser() user: User): Promise<void> {
    return this.tasksService.moveTask(+task_id, +new_order, user);
  }

  @ApiOperation({ summary: 'Удаление задачи по id' })
  @ApiResponse({ status: 200, type: null })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteTask(@Query('task_id') task_id: string, @CurrentUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(+task_id, user);
  }
}