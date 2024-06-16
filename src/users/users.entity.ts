import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Project } from "src/projects/projects.entity";
import { Task } from "src/tasks/tasks.entity";


@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'qliquiz', description: 'Логин' })
  @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({ example: '5', description: 'Количество списков' })
  @Column({ type: 'int', default: 0 })
  listsNumber: number;

  @ApiProperty({ example: '4', description: 'Количество полностью выполненных списков' })
  @Column({ type: 'int', default: 0 })
  doneListsNumber: number;

  @ApiProperty({ example: '0.8', description: 'Отношение полностью выполненных списков ко всем спискам' })
  @Column({ type: 'float', default: 0.0 })
  listsDoneRate: number;

  @ApiProperty({ example: '50', description: 'Количество задач' })
  @Column({ type: 'int', default: 0 })
  tasksNumber: number;
  
  @ApiProperty({ example: '25', description: 'Количество выполненных задач' })
  @Column({ type: 'int', default: 0 })
  doneTasksNumber: number;

  @ApiProperty({ example: '0.5', description: 'Отношение выполненных задач ко всем задачам' })
  @Column({ type: 'float', default: 0.0 })
  tasksDoneRate: number;

  @ApiProperty({ example: '2024-06-16T04:01:57.423Z', description: 'Время регистрации' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  signUpAt: Date;

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];
}