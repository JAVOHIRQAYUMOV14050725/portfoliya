import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private repo: Repository<Experience>,
  ) { }

  findAll() {
    return this.repo.find({ order: { startDate: 'DESC' } });
  }

  create(dto: CreateExperienceDto) {
    return this.repo.save(dto);
  }

  update(id: number, dto: UpdateExperienceDto) {
    return this.repo.update(id, dto);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}