import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
  login: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'int', default: 0 })
  listsNumber: number;

  @Column({ type: 'int', default: 0 })
  doneListsNumber: number;

  @Column({ type: 'float', default: 0.0 })
  listsDoneRate: number;

  @Column({ type: 'int', default: 0 })
  tasksNumber: number;
  
  @Column({ type: 'int', default: 0 })
  doneTasksNumber: number;

  @Column({ type: 'float', default: 0.0 })
  tasksDoneRate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  signUp: Date;
}