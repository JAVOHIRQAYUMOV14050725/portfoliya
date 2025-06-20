import { Body, Controller, Get, Post } from "@nestjs/common";
import { ContactMessageService } from "./contact-message.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Controller('contact')
export class ContactMessageController {
  constructor(private readonly service: ContactMessageService) { }

  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
