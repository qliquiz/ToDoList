import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(dto: UserDTO): Promise<User | null> {
    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['projects.columns.tasks'] });
  }

  async getUser(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {id: id},
      relations: ['projects.columns.tasks']
    });
  }

  async getUserByLogin(login: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({login: login});
  }

  async updateUser(id: number, dto: UserDTO): Promise<User | null> {
    await this.usersRepository.update({id: id}, dto);
    return await this.usersRepository.save({id: id});
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete({id: id});
  }
}