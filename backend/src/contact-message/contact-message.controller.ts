import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ContactMessageService } from "./contact-message.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { AuthGuard } from "src/common/guards/auth.guard";

@Controller('contact')
export class ContactMessageController {
  constructor(private readonly service: ContactMessageService) { }


  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
