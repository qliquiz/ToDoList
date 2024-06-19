import { User } from 'src/users/users.entity';
import { UserDTO } from 'src/users/users.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async logIn(userDTO: UserDTO) {
    const user = await this.validateUser(userDTO);
    return this.generateToken(user);
  }

  async signUp(userDTO: UserDTO) {
    const candidate = await this.userService.getUserByLogin(userDTO.login);
    if (candidate) throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
    const hashPassword = await bcrypt.hash(userDTO.password, 5);
    const newUser = await this.userService.createUser({ ...userDTO, password: hashPassword });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.login };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDTO: UserDTO) {
    const user = await this.userService.getUserByLogin(userDTO.login);
    const pasAreEq = await bcrypt.compare(userDTO.password, user.password);
    if (user && pasAreEq) return user;
    throw new UnauthorizedException({ message: 'Некорректный логин или пароль' });
  }
}