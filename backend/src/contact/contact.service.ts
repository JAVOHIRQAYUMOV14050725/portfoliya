import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/create-contact.dto";
import * as nodemailer from 'nodemailer'; // ✅ Nodemailer import

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) { }

  async create(dto: CreateContactDto) {
    const contact = this.contactRepo.create(dto);
    const saved = await this.contactRepo.save(contact);
    await this.sendMail(dto); // 📧 Email yuboriladi
    return saved;
  }

  findAll() {
    return this.contactRepo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.contactRepo.findOne({ where: { id } });
  }

  update(id: number, dto: Partial<CreateContactDto>) {
    return this.contactRepo.update(id, dto);
  }

  remove(id: number) {
    return this.contactRepo.delete(id);
  }

  // ✉️ Email yuboruvchi yordamchi
  async sendMail(data: CreateContactDto) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your.email@gmail.com',      // <-- O‘zingizning emailingiz
        pass: 'your-app-password',         // <-- App password
      },
    });

    await transporter.sendMail({
      from: '"Portfolio Site" <your.email@gmail.com>',
      to: 'your.email@gmail.com',
      subject: `New Contact from ${data.fullName}`,
      html: `
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `,
    });
  }
}
