import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/users/users.dto';
import { AuthService } from './auth.service';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  logIn(@Body() userDTO: UserDTO) {
    return this.authService.logIn(userDTO);
  }

  @Post('/signup')
  signUp(@Body() userDTO: UserDTO) {
    return this.authService.signUp(userDTO);
  }
}