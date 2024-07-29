import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class TaskDTO {
  @ApiProperty({ example: 'Убраться дома', description: 'Название' })
  readonly name: string;
  @ApiProperty({ example: 'До 14:00', description: 'Подробности' })
  readonly details: string;
  @ApiProperty({ example: '1', description: 'Порядок в списке' })
  readonly order: number;
}