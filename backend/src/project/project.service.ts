// 📁 src/project/project.service.ts

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async create(dto: CreateProjectDto, userId: number) {
    const project = this.projectRepository.create({ ...dto, userId });
    return this.projectRepository.save(project);
  }

  async findAll(userId: number) {
    return this.projectRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    return this.projectRepository.findOne({ where: { id, userId } });
  }

  async update(id: number, dto: UpdateProjectDto, userId: number) {
    const project = await this.findOne(id, userId);
    if (!project) throw new NotFoundException('Project not found');
    return this.projectRepository.save({ ...project, ...dto });
  }

  async remove(id: number, userId: number) {
    const project = await this.findOne(id, userId);
    if (!project) throw new NotFoundException('Project not found');
    return this.projectRepository.remove(project);
  }
}
