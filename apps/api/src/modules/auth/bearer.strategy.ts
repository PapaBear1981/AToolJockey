import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService, AuthenticatedUser } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super();
  }

  async validate(token: string): Promise<AuthenticatedUser> {
    const user = await this.auth.validateToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
