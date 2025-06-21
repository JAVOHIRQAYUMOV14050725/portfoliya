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
  UploadedFile,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  async findAllPublic() {
    return this.projectService.findAllPublic();
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async findAllByUser(@Req() req: Request) {
    const user = req.session.user;
    if (!user) throw new UnauthorizedException('User not logged in');
    return this.projectService.findAllByUser(user.id);
  }

  // ✅ Upload endpoint
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (_req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = process.env.BASE_URL 
    return { imageUrl: `${baseUrl}/uploads/projects/${file.filename}` };
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const user = req.session.user!;
    return this.projectService.create(dto, user.id);
  }

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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.session.user!;
    return this.projectService.remove(+id, user.id);
  }
}
