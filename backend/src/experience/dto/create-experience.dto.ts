import { IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
    @IsString()
    title: string;

    @IsString()
    company: string;

    @IsString()
    description: string;

    @IsString()
    startDate: string;

    @IsOptional()
    @IsString()
    endDate?: string;

    @IsOptional()
    @IsString()
    icon?: string;
}