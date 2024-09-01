import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
type authInput = { id: number; email: string };
type siginp = { id: number };
type AuthResult = { accestoken: string; id: number };
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: authInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('not acces');
    }
    return this.signIn({ id: user.id });
  }

  async validateUser(input: authInput): Promise<siginp | null> {
    const user = await this.usersService.findOne(input.id);
    if (user && user.email === input.email) {
      return {
        id: user.id,
      };
    }
    return null;
  }

  async signIn(user: siginp): Promise<AuthResult> {
    const tokenpay = {
      sub: user.id,
    };
    const accestoken = await this.jwtService.signAsync(tokenpay);
    return { accestoken, id: user.id };
  }
}
