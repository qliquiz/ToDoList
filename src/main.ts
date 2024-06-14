import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Список задач')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('qliquiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  
  await app.listen(process.env.PORT, () => console.log(`The server is running on port ${process.env.PORT}`));
}

bootstrap();