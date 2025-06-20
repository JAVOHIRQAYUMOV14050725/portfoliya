import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill, SkillType } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
@Injectable()
export class SkillsService {
  constructor(@InjectRepository(Skill) private repo: Repository<Skill>) { }

  findAll(): Promise<Skill[]> {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  create(data: CreateSkillDto) {
    return this.repo.save(this.repo.create(data));
  }

  update(id: number, data: UpdateSkillDto) {
    return this.repo.save({ id, ...data });
  }

  async remove(id: number) {
    const skill = await this.repo.findOneBy({ id });
    if (!skill) throw new NotFoundException('Not found');
    return this.repo.remove(skill);
  }
}
