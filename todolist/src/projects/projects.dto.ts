import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class ProjectDTO {
  @ApiProperty({ example: 'todo1', description: 'Заголовок' })
  readonly title: string;
  @ApiProperty({ example: 'Подготовка к Новому Году', description: 'Описание' })
  readonly description: string;
}