import { IsEmail, IsString } from "class-validator";

export class CreateContactMessageDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    message: string;
}
  