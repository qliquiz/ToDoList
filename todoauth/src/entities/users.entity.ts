import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Project } from "./projects.entity";

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'qliquiz', description: 'Логин' })
  @Column({ type: 'varchar', unique: true, length: 20, nullable: false })
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({ example: '2024-06-16T04:01:57.423Z', description: 'Время регистрации' })
  @CreateDateColumn()
  signUpAt: Date;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}