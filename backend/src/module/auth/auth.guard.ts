import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] ?? '';
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token) {
      throw new UnauthorizedException('Bearer token not found');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      payload.roles = ['admin'];
      request.user = payload;
      console.log('payload', payload);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Bearer token is invalid or expired');
    }
  }
}
