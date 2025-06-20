import { IsString } from 'class-validator';

export class CreateContactInfoDto {
    @IsString() phone: string;
    @IsString() email: string;
    @IsString() location: string;
    @IsString() github: string;
    @IsString() telegram: string;
    @IsString() linkedin: string;
}