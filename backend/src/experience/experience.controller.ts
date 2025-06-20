import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly service: ExperienceService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}