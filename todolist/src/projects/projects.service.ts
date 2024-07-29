import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDTO } from './projects.dto';
import { Project } from './projects.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  async createProject(dto: ProjectDTO, user: User): Promise<Project | null> {
    const newProject = this.projectsRepository.create({
      ...dto,
      user
    });
    return await this.projectsRepository.save(newProject);
  }

  async getProjects(user: User): Promise<Project[]> {
    return await this.projectsRepository.find({
      where: { user: { id: user.id } },
      relations: ['columns.tasks']
    });
  }

  async getProject(project_id: number, user: User): Promise<Project | null> {
    const project = await this.projectsRepository.findOne({
      where: {id: project_id, user: { id: user.id } },
      relations: ['columns.tasks']
    });
    if (!project) throw new NotFoundException('Проект не найден или недоступен');
    return project;
  }

  async updateProject(dto: ProjectDTO, project_id: number, user: User): Promise<Project | null> {
    const project = await this.projectsRepository.findOneBy({ id: project_id, user: { id: user.id } });
    if (!project) throw new NotFoundException('Проект не найден или недоступен');
    await this.projectsRepository.update({ id: project_id }, dto);
    return await this.projectsRepository.save({ id: project_id });
  }

  async deleteProject(project_id: number, user: User): Promise<void> {
    const project = await this.projectsRepository.findOneBy({ id: project_id, user: { id: user.id } });
    if (!project) throw new NotFoundException('Проект не найден или недоступен');
    await this.projectsRepository.remove(project);
  }
}