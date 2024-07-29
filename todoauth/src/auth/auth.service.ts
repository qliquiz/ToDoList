import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../entities/users.dto';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async logIn(userDTO: UserDTO) {
    const user = await this.validateUser(userDTO);
    return this.generateToken(user);
  }

  async signUp(userDTO: UserDTO) {
    const candidate = await this.usersRepository.findOne({ where: { login: userDTO.login } });
    if (candidate) {
      throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDTO.password, 5);
    const newUser = await this.usersRepository.save({ ...userDTO, password: hashPassword });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.login };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDTO: UserDTO) {
    const user = await this.usersRepository.findOne({ where: { login: userDTO.login } });
    if (!user) {
      throw new UnauthorizedException({ message: 'Некорректный логин или пароль' });
    }
    const passwordEquals = await bcrypt.compare(userDTO.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный логин или пароль' });
  }
}
