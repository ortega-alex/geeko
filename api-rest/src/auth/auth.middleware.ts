import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwService: JwtService) {}

    async use(req: Request, res: Response, next: () => void) {
        const { authorization } = req.headers;
        const [type, token] = authorization?.split(' ') ?? [];
        if (type !== 'Bearer' || !token)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

        try {
            const payload = await this.jwService.verifyAsync(token, {
                secret: String(process.env.JWT_SECRET) ?? ''
            });
            res['user'] = payload;
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
        }

        next();
    }
}
