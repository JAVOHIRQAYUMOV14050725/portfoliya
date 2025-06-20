// contact-info.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('contact-info')
export class ContactInfoController {
  constructor(private readonly service: ContactInfoService) { }

    @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateContactInfoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('latest')
  findLatest() {
    return this.service.findLatest();
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContactInfoDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
