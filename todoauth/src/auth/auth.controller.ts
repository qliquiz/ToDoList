import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../entities/users.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  logIn(@Body() userDTO: UserDTO) {
    return this.authService.logIn(userDTO);
  }

  @Post('signup')
  signUp(@Body() userDTO: UserDTO) {
    return this.authService.signUp(userDTO);
  }
}
