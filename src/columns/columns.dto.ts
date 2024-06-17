import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class ColumnDTO {
  @ApiProperty({ example: 'to do', description: 'Название' })
  readonly name: string;
  /* @ApiProperty({ example: '1', description: 'Порядок в списке' })
  readonly order: string; */
}