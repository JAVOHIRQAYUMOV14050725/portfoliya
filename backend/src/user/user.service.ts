// 📁 src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async createUser(fullName: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ fullName, email, password: hashed });
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  // ✅ Avtomatik admin yaratish
  async createAdminIfNotExists() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const exists = await this.repo.findOne({ where: { email } });
    if (exists) {
      console.log(`ℹ️ Admin already exists: ${email}`);
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({
      fullName: 'Super Admin',
      email,
      password: hashed,
      role: UserRole.ADMIN,
    });

    await this.repo.save(user);
    console.log(`✅ Admin created: ${email}`);
  }
}
