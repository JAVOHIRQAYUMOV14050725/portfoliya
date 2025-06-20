import { Controller, Get, Post, Body, Put, Param, UseGuards, Delete } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) { }

  @Get()
  getHero() {
    return this.heroService.find();
  }

    // @UseGuards(AuthGuard)
  @Post()
  createHero(@Body() dto: CreateHeroDto) {
    return this.heroService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateHero(@Param('id') id: string, @Body() dto: CreateHeroDto) {
    return this.heroService.update(+id, dto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteHero(@Param('id') id: string) {
    return this.heroService.delete(+id);
  }
}
