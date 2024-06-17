import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';


@Entity()
export class ColumnEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'to do', description: 'Название' })
  @Column()
  name: string;

  @ApiProperty({ example: '0', description: 'Порядок в списке' })
  @Column()
  order: number;

  @ManyToOne(() => Project, (project) => project.columns)
  project: Project;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];
}