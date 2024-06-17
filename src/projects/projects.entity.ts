import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { ColumnEntity } from 'src/columns/columns.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Project {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Новый Год', description: 'Заголовок' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @ApiProperty({ example: 'Подготовка к Новому Году', description: 'Описание' })
  @Column({ type: 'varchar', length: 100, default: '' })
  description: string;

  @ApiProperty({ example: '2024-06-16T04:01:57.423Z', description: 'Время создания' })
  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => ColumnEntity, (column) => column.project, { cascade: true })
  columns: ColumnEntity[];
}