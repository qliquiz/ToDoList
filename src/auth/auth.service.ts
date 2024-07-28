import { UserDTO } from 'src/users/users.dto';
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private client: ClientProxy;
  
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false
        }
      }
    });
  }

  async logIn(userDTO: UserDTO) {
    return this.client.send({ cmd: 'login' }, userDTO).toPromise();
  }

  async signUp(userDTO: UserDTO) {
    return this.client.send({ cmd: 'signup' }, userDTO).toPromise();
  }
}
