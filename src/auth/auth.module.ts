import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {expiresIn: '24h'}
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
