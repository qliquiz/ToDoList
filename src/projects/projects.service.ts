import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { ProjectDTO } from './projects.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  async createProject(dto: ProjectDTO, user_id: number): Promise<Project | null> {
    const user = await this.usersService.getUser(user_id);
    const newProject = this.projectsRepository.create({
      ...dto,
      user
    });
    return await this.projectsRepository.save(newProject);
  }

  async getProjects(user_id: number): Promise<Project[]> {
    return await this.projectsRepository.find({
      where: { user: { id: user_id } },
      relations: ['columns.tasks']
    });
  }

  async getProject(project_id: number): Promise<Project | null> {
    return await this.projectsRepository.findOne({
      where: {id: project_id},
      relations: ['columns.tasks']
    });
  }

  async updateProject(dto: ProjectDTO, project_id: number): Promise<Project | null> {
    await this.projectsRepository.update({id: project_id}, dto);
    return await this.projectsRepository.save({id: project_id});
  }

  async deleteProject(project_id: number): Promise<void> {
    await this.projectsRepository.delete({id: project_id});
  }
}