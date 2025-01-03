import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class InfoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    const expectedPassword = atob('UDRzNVcwckRAMTIz');

    if (authHeader !== expectedPassword) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
