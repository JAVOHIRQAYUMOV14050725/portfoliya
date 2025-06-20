// 📁 src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { ExperienceModule } from './experience/experience.module';
import { UploadModule } from './upload/upload.module';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ .env ni global yuklaydi
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'portfolio',
      autoLoadEntities: true, // ✅ entitylarni avtomatik yuklash
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProjectModule,
    SkillModule,
    ExperienceModule,
    UploadModule,
    HeroModule,
  ],
})
export class AppModule { }
