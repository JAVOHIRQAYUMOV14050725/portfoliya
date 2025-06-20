import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private heroRepo: Repository<Hero>,
  ) { }

  find(): Promise<Hero[]> {
    return this.heroRepo.find();
  }

  async create(dto: CreateHeroDto): Promise<Hero> {
    const hero = this.heroRepo.create(dto);
    return this.heroRepo.save(hero);
  }

  async update(id: number, dto: CreateHeroDto): Promise<Hero> {
    const hero = await this.heroRepo.findOneBy({ id });
    if (!hero) throw new NotFoundException('Hero not found');
    Object.assign(hero, dto);
    return this.heroRepo.save(hero);
  }

  async delete(id: number): Promise<void> {
    const hero = await this.heroRepo.findOneBy({ id });
    if (!hero) throw new NotFoundException('Hero not found');
    await this.heroRepo.remove(hero);
  }  
}
