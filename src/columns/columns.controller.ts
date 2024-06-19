import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ColumnEntity } from './columns.entity';
import { CurrentUser } from 'src/auth/user.decorator';
import { ColumnDTO } from './columns.dto';
import { User } from 'src/users/users.entity';

@ApiTags('Столбцы')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание столбца' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @UseGuards(JwtAuthGuard)
  @Post()
  createColumn(@Body() dto: ColumnDTO, @Query('project_id') project_id: string, @CurrentUser() user: User): Promise<ColumnEntity | null> {
    return this.columnsService.createColumn(dto, +project_id, user);
  }

  @ApiOperation({ summary: 'Получение всех столбцов пользователя' })
  @ApiResponse({ status: 200, type: [ColumnEntity] })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getColumns(@Query('project_id') project_id: string, @CurrentUser() user: User): Promise<ColumnEntity[]> {
    return this.columnsService.getColumns(+project_id, user);
  }

  @ApiOperation({ summary: 'Получение столбца по id' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @UseGuards(JwtAuthGuard)
  @Get()
  getColumn(@Query('column_id') column_id: string, @CurrentUser() user: User): Promise<ColumnEntity | null> {
    return this.columnsService.getColumn(+column_id, user);
  }

  @ApiOperation({ summary: 'Изменение столбца по id' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @UseGuards(JwtAuthGuard)
  @Put()
  updateColumn(@Body() dto: ColumnDTO, @Query('column_id') column_id: string, @CurrentUser() user: User): Promise<ColumnEntity | null> {
    return this.columnsService.updateColumn(dto, +column_id, user);
  }
  
  @ApiOperation({ summary: 'Перемещение столбца' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @UseGuards(JwtAuthGuard)
  @Put('move')
  moveColumn(@Query('column_id') column_id: string, @Query('new_order') new_order: string, @CurrentUser() user: User): Promise<ColumnEntity | null> {
    return this.columnsService.moveColumn(+column_id, +new_order, user);
  }

  @ApiOperation({ summary: 'Удаление столбца по id' })
  @ApiResponse({ status: 200, type: null })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteColumn(@Query('column_id') column_id: string, @CurrentUser() user: User): Promise<void> {
    return this.columnsService.deleteColumn(+column_id, user);
  }
}