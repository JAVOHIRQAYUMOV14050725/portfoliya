import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import connectRedis from 'connect-redis';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

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

  await app.listen(3000);
}
bootstrap();
