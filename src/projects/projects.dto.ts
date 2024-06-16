import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class ProjectsDTO {
  @ApiProperty({ example: 'todo1', description: 'Название' })
  readonly name: string;
  @ApiProperty({ example: 'blablabla', description: 'Описание' })
  readonly description: string;
}