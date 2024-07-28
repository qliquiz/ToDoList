import { Body, Controller, Post, Get, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CurrentUser } from 'src/users/users.decorator';
import { ProjectDTO } from './projects.dto';
import { Project } from './projects.entity';
import { User } from 'src/users/users.entity';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@Body() dto: ProjectDTO, @CurrentUser() user: User): Promise<Project | null> {
    return this.projectsService.createProject(dto, user);
  }

  @ApiOperation({ summary: 'Получение всех проектов пользователя' })
  @ApiResponse({ status: 200, type: [Project] })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getProjects(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectsService.getProjects(user);
  }

  @ApiOperation({ summary: 'Получение проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Get()
  getProject(@Query('project_id') project_id: string, @CurrentUser() user: User): Promise<Project | null> {
    return this.projectsService.getProject(+project_id, user);
  }

  @ApiOperation({ summary: 'Изменение проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Put()
  updateProject(@Body() dto: ProjectDTO, @Query('project_id') project_id: string, @CurrentUser() user: User): Promise<Project | null> {
    return this.projectsService.updateProject(dto, +project_id, user);
  }

  @ApiOperation({ summary: 'Удаление проекта по id' })
  @ApiResponse({ status: 200, type: null })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteProject(@Query('project_id') project_id: string, @CurrentUser() user: User): Promise<void> {
    return this.projectsService.deleteProject(+project_id, user);
  }
}