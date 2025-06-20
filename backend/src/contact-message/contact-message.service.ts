import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContactMessage } from "./entities/contact-message.entity";
import { Repository } from "typeorm";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Injectable()
export class ContactMessageService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
  ) { }

  async create(dto: CreateContactMessageDto) {
    const message = this.repo.create(dto);
    return this.repo.save(message);
  }

  async findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
