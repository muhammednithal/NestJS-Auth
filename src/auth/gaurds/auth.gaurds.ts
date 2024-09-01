import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorisation = request.headers.authorization;
    const token = authorisation.split(' ')[1];
    if (!token) throw new UnauthorizedException('TOKEN ILA');

    try {
      const tokenpay = await this.jwtService.verifyAsync(token);
      request.user = {
        id: tokenpay.sub,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('TOKEN FAKE');
    }
  }
}
