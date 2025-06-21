// contact-info.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('contact-info')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) { }

  // 🔐 Only Admin can create new contact info
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateContactInfoDto) {
    return this.contactInfoService.create(dto);
  }

  // 🌍 Get all records (optional use for admin list)
  @Get()
  findAll() {
    return this.contactInfoService.findAll();
  }

  // 📌 Get latest record for public site
  @Get('latest')
  findLatest() {
    return this.contactInfoService.findLatest();
  }

  // 🔐 Update by ID (Admin only)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactInfoDto,
  ) {
    return this.contactInfoService.update(id, dto);
  }

  // 🔐 Delete by ID (Admin only)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactInfoService.remove(id);
  }
}
