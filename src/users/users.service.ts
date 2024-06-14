import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserCreateDTO } from './users.create.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(dto: UserCreateDTO): Promise<User | null> {
    const newUser = this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({id: id});
  }

  async updateUser(id: number, dto: UserCreateDTO): Promise<User | null> {
    await this.usersRepository.update({id: id}, dto);
    await this.usersRepository.save({id: id});
    return this.usersRepository.findOneBy({id: id});
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete( {id: id} );
  }
}