import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ContactMessageService } from "./contact-message.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Controller('contact')
export class ContactMessageController {
  constructor(private readonly service: ContactMessageService) { }

// faqat manashu post public chunki bu emailga habar jo'natish qismini amalga oshiradi
  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
