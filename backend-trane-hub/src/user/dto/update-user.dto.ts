import { UserRole } from '@prisma/client';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
    @IsString()
    @IsOptional()
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;
}
