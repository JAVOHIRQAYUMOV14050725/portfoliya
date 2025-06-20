// contact-info.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private repo: Repository<ContactInfo>,
  ) { }

  create(dto: CreateContactInfoDto) {
    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findLatest() {
    return this.repo.findOne({ order: { createdAt: 'DESC' } });
  }

  update(id: number, dto: UpdateContactInfoDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
