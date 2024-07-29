import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() userDTO: UserDTO) {
    return this.authService.logIn(userDTO);
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return this.authService.signUp(userDTO);
  }
}
