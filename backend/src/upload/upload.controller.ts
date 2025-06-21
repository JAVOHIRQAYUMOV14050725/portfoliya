// 📁 src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('upload')
export class UploadController {
  @UseGuards(AuthGuard)
  @Post('project-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (_req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadProjectImage(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = process.env.BASE_URL 
    return {
      imageUrl: `${baseUrl}/uploads/projects/${file.filename}`,
    };
  }
}
