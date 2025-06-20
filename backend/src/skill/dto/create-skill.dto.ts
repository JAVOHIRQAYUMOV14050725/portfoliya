import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SkillType } from '../entities/skill.entity';

export class CreateSkillDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsString()
    level?: string;

    @IsEnum(SkillType)
    type: SkillType;
}
