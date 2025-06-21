import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsUrl,
    Matches,
} from 'class-validator';

export class CreateContactInfoDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?\d{7,15}$/, { message: 'Telefon raqami noto‘g‘ri formatda' })
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsUrl({}, { message: 'GitHub havolasi noto‘g‘ri formatda' })
    github: string;

    @IsString()
    @Matches(/^@[\w\d_]{3,32}$/, { message: 'Telegram username noto‘g‘ri' })
    telegram: string;

    @IsString()
    linkedin: string;
}
  