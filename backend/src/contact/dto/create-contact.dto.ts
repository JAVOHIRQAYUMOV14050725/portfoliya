import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    message: string;
}
