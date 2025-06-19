// 📁 src/project/project.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { AuthGuard } from '../common/guards/auth.guard';

@UseGuards(AuthGuard) // ❗ Hamma endpointlar login bo‘lgan foydalanuvchi uchun
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
    

    return this.projectService.create(dto, user.id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
        return this.projectService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: Request) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
        return this.projectService.findOne(id, user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProjectDto,
    @Req() req: Request,
  ) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
        return this.projectService.update(id, dto, user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: Request) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
        return this.projectService.remove(id, user.id);
  }
}
