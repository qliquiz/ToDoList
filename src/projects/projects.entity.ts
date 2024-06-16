import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Task } from 'src/tasks/tasks.entity';
import { User } from 'src/users/users.entity';


@Entity()
export class Project {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Новый Год', description: 'Название' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({ example: 'Подготовка к Новому Году', description: 'Описание' })
  @Column({ type: 'varchar', length: 100, default: '' })
  description: string;

  @ApiProperty({ example: '14.06.2024, 21:39:44', description: 'Время создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => ColumnEntity, (column) => column.project, { cascade: true })
  columns: ColumnEntity[];

  @ManyToMany(() => Task, (task) => task.projects, { cascade: true })
  @JoinTable()
  tasks: Task[];
}