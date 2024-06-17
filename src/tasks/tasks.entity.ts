import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ColumnEntity } from "src/columns/columns.entity";
import { Project } from "src/projects/projects.entity";
import { User } from "src/users/users.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Task {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: '0', description: 'Порядок в списке' })
  @Column()
  order: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  column: ColumnEntity;
}