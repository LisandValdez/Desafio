import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, 
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
  console.log('Backend escuchando en http://localhost:' + (process.env.PORT || 3000));
}
bootstrap();
