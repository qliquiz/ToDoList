import { Controller, Post, Get, Put, Delete, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './users.create.dto';
import { User } from './users.entity';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDTO: UserCreateDTO): Promise<User | null> { return this.usersService.createUser(userDTO); }

  @Get('all')
  getUsers(): Promise<User[]> { return this.usersService.getUsers(); }

  @Get()
  getUser(@Query('id') id: string): Promise<User | null> { return this.usersService.getUser(Number(id)); }

  @Put()
  updateUser(@Query('id') id: string, @Body() userDTO: UserCreateDTO): Promise<User | null> { return this.usersService.updateUser(Number(id), userDTO); }

  @Delete()
  deleteUser(@Query('id') id: string): Promise<void> { return this.usersService.deleteUser(Number(id)); }
}