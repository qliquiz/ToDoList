import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { ColumnEntity } from "src/columns/columns.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Task {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Убраться дома', description: 'Название' })
  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @ApiProperty({ example: 'До 14:00', description: 'Подробности' })
  @Column({ type: 'varchar', length: 100, default: '' })
  details: string;

  @ApiProperty({ example: '0', description: 'Порядок в списке' })
  @Column({ type: 'int', nullable: false})
  order: number;

  @ApiProperty({ example: '2024-06-16T04:01:57.423Z', description: 'Время создания' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  column: ColumnEntity;
}