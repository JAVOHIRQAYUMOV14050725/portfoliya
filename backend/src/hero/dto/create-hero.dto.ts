import { IsString, IsArray } from 'class-validator';

export class CreateHeroDto {
    @IsString()
    name: string;

    @IsString()
    tagline: string;

    @IsArray()
    technologies: string[];
}
