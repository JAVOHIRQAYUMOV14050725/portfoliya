import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  create(@Body() body: { fullName: string; email: string; password: string }) {
    return this.usersService.createUser(body.fullName, body.email, body.password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }
}
