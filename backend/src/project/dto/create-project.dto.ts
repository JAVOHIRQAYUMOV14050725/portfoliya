// create-project.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    techStack: string[];

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    githubUrl: string;

    @IsString()
    @IsOptional()
    liveUrl?: string;
}
