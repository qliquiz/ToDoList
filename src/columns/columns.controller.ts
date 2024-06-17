import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './columns.entity';
import { ColumnDTO } from './columns.dto';

@ApiTags('Столбцы')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание столбца' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Post()
  createColumn(@Body() dto: ColumnDTO, @Query('user_id') user_id: string, @Query('project_title') project_title: string): Promise<ColumnEntity | null> {
    return this.columnsService.createColumn(dto, Number(user_id), project_title);
  }

/*   @ApiOperation({ summary: 'Получение всех столбцов' })
  @ApiResponse({ status: 200, type: [ColumnEntity] })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Get('all')
  getColumns(@Query('user_id') user_id: string, @Query('project_id') project_id: string): Promise<ColumnEntity[]> {
    return this.columnsService.getColumns(Number(user_id), Number(project_id));
  }

  @ApiOperation({ summary: 'Получение столбца по id' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Get()
  getColumn(@Query('user_id') user_id: string, @Query('project_id') project_id: string): Promise<ColumnEntity | null> {
    return this.columnsService.getColumn(Number(user_id), Number(project_id));
  }

  @ApiOperation({ summary: 'Изменение столбца по id' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Put()
  updateColumn(@Body() dto: ColumnDTO, @Query('project_id') project_id: string): Promise<ColumnEntity | null> {
    return this.columnsService.updateColumn(dto, Number(project_id));
  }

  @ApiOperation({ summary: 'Удаление столбца по id' })
  @ApiResponse({ status: 200, type: null })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Delete()
  deleteColumn(@Query('project_id') project_id: string): Promise<void> {
    return this.columnsService.deleteColumn(Number(project_id));
  } */
}