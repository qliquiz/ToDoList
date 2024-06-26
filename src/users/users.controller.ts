import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators/';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
import { User } from './users.entity';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body() userDTO: UserDTO): Promise<User | null> { return this.usersService.createUser(userDTO); }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getUsers(): Promise<User[]> { return this.usersService.getUsers(); }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Query('id') id: string): Promise<User | null> { return this.usersService.getUser(+id); }

  @ApiOperation({ summary: 'Изменение пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Put()
  updateUser(@Query('id') id: string, @Body() userDTO: UserDTO): Promise<User | null> { return this.usersService.updateUser(+id, userDTO); }

  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @ApiResponse({ status: 200, type: null })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Query('id') id: string): Promise<void> { return this.usersService.deleteUser(+id); }
}