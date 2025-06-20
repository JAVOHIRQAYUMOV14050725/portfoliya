import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  // ✅ Public: ko‘rish hammaga ochiq
  @Get()
  async findAllPublic() {
    return this.projectService.findAllPublic();
  }

  // 🔐 Authenticated user: o‘ziga tegishli projectlar
  @UseGuards(AuthGuard)
  @Get('my')
  async findAllByUser(@Req() req: Request) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
    return this.projectService.findAllByUser(user.id);
  }

  // 🔐 Create
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const user = req.session.user!;
    return this.projectService.create(dto, user.id);
  }

  // 🔐 Update
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @Req() req: Request,
  ) {
    const user = req.session.user!;
    return this.projectService.update(+id, dto, user.id);
  }

  // 🔐 Delete
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.session.user!;
    return this.projectService.remove(+id, user.id);
  }
}
