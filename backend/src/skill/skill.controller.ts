// 📁 src/skill/skill.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillType } from './entities/skill.entity';
import { AuthGuard } from '../common/guards/auth.guard';
import { SkillsService } from './skill.service';

@Controller('skills')
export class SkillsController {
  constructor(private service: SkillsService) { }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateSkillDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSkillDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
