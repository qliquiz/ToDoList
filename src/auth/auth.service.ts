import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserDTO } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'auth_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async logIn(userDTO: UserDTO) {
    return this.client.send({ cmd: 'login' }, userDTO).toPromise();
  }

  async signUp(userDTO: UserDTO) {
    return this.client.send({ cmd: 'signup' }, userDTO).toPromise();
  }
}
