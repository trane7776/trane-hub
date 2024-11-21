import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ id }: { id: string }) {
        return this.userService.getById(id);
    }
}

// как эта песня заводится
// создается токен и отдается клиенту
// затем клиент при вызове с гуардом посылает в bearer header свой токен
// токен проверяется на валидность и если все ок то возвращается юзер и вшишется в реквест
// затем мы можем использовать этого юзера в контроллерах
