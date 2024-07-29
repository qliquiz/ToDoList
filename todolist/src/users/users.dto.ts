import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UserDTO {
  @ApiProperty({ example: 'qliquiz', description: 'Логин' })
  readonly login: string;
  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  readonly password: string;
}