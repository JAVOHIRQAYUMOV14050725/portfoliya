import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/create-contact.dto";
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,

  ) { }

  async create(dto: CreateContactDto) {
    const contact = this.contactRepo.create(dto);
    const saved = await this.contactRepo.save(contact);
    await this.sendMail(dto);
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

  // ✉️ Gmail orqali kontakt email yuborish (verify bilan)
  async sendMail(data: CreateContactDto) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      logger: true,  // <-- Debug loglar
      debug: true,   // <-- SMTP loglar
    });

    // ✅ Gmail SMTP ulanishini tekshirish
    try {
      await transporter.verify();
      console.log("✅ SMTP server is ready to send email.");
    } catch (err) {
      console.error("❌ SMTP verification failed:", err);
      return;
    }

    await transporter.sendMail({
      from: `"Portfolio Site" <${process.env.MAIL_USER}>`, // 💡 from = gmail
      to: process.env.MAIL_USER, // o‘zingizga yuboriladi
      replyTo: data.email, // foydalanuvchiga javob yozish uchun
      subject: `New Contact from ${data.fullName}`,
      html: `
        <h2>📬 New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `,
    }).then(info => {
      console.log("📨 Email accepted by Gmail:", info.accepted);
      console.log("📬 Email response:", info.response);
    }).catch(err => {
      console.error("❌ Email sending failed:", err);
    });
  }

}
