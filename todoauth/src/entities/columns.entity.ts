import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Project } from './projects.entity';
import { Task } from './tasks.entity';

@Entity()
export class ColumnEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'to do', description: 'Название' })
  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @ApiProperty({ example: '0', description: 'Порядок в списке' })
  @Column({ type: 'int', nullable: false})
  order: number;

  @ManyToOne(() => Project, (project) => project.columns, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  project: Project;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}