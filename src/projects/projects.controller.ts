import { Body, Controller, Post, Get, Query, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger/dist/decorators';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { ProjectDTO } from './projects.dto';

@ApiTags('Проекты')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 200, type: Project })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Post()
  createProject(@Body() dto: ProjectDTO, @Query('user_id') user_id: string): Promise<Project | null> {
    return this.projectsService.createProject(dto, Number(user_id));
  }

  @ApiOperation({ summary: 'Получение всех проектов' })
  @ApiResponse({ status: 200, type: [Project] })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Get('all')
  getProjects(@Query('user_id') user_id: string): Promise<Project[]> {
    return this.projectsService.getProjects(Number(user_id));
  }

  @ApiOperation({ summary: 'Получение проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Get()
  getProject(@Query('project_id') project_id: string): Promise<Project | null> {
    return this.projectsService.getProject(Number(project_id));
  }

  @ApiOperation({ summary: 'Изменение проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Put()
  updateProject(@Body() dto: ProjectDTO, @Query('project_id') project_id: string): Promise<Project | null> {
    return this.projectsService.updateProject(dto, Number(project_id));
  }

  @ApiOperation({ summary: 'Удаление проекта по id' })
  @ApiResponse({ status: 200, type: null })
  // @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Delete()
  deleteProject(@Query('project_id') project_id: string): Promise<void> {
    return this.projectsService.deleteProject(Number(project_id));
  }
}