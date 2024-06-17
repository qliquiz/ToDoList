import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Task } from 'src/tasks/tasks.entity';
import { ProjectDTO } from './projects.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async createProject(dto: ProjectDTO, user_id: number): Promise<Project | null> {
    const user = await this.usersService.getUser(user_id);
    const newProject = this.projectsRepository.create({...dto, user, columns: []});
    // user.projects.push(newProject);
    await this.projectsRepository.save(newProject);
    return newProject;
  }

  async getProjects(user_id: number): Promise<Project[]> {
    const user = await this.usersService.getUser(user_id);
    return await this.projectsRepository.find({where: {user}});
  }

  async getProject(user_id: number, project_title: string): Promise<Project | null> {
    const user = await this.usersService.getUser(user_id);
    return await this.projectsRepository.findOneBy({title: project_title, user: user});
  }

  async updateProject(dto: ProjectDTO, project_id: number): Promise<Project | null> {
    await this.projectsRepository.update({id: project_id}, dto);
    await this.projectsRepository.save({id: project_id});
    return this.projectsRepository.findOneBy({id: project_id});
  }

  async deleteProject(project_id: number): Promise<void> {
    await this.projectsRepository.delete( {id: project_id} );
  }
}