import { IsString } from 'class-validator';

export class RefreshTokenDto {
    @IsString({
        message: 'Неверный формат refresh токена',
    })
    refreshToken: string;
}
