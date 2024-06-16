import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ColumnEntity } from "src/columns/columns.entity";
import { Project } from "src/projects/projects.entity";
import { User } from "src/users/users.entity";


@Entity()
export class Task {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @Column()
  order: number;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  column: ColumnEntity;

  @ManyToMany(() => Project, (project) => project.tasks)
  @JoinTable()
  projects: Project[];

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}