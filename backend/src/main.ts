import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import connectRedis from 'connect-redis';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from './user/user.service';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Redis client
  const redisClient = createClient({
    socket: {
      host: configService.get<string>('REDIS_HOST') || 'localhost',
      port: parseInt(configService.get<string>('REDIS_PORT') || '6379', 10),
    },
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();


  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Session o‘rnatish
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get<string>('SESSION_SECRET') || 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 soat
        httpOnly: true,
      },
    }),
  );
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: 'http://localhost:5173', // yoki deploy bo‘lsa frontend URL
    credentials: true,
  });
  const userService = app.get(UsersService);
  await userService.createAdminIfNotExists(); // 👉 bu metod user.service.ts faylingizda mavjud bo‘lishi kerak

  

  await app.listen(3000);
}
bootstrap();
