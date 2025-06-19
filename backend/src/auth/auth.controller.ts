import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    req.session['user'] = user;
    return { message: 'Logged in', user };
  }

  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy(() => { });
    return { message: 'Logged out' };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return req.session['user'];
  }
}
