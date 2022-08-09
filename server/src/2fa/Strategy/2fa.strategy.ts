import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Strategy } from 'passport-local'

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getUserBylogin(payload.login);
    
    if (!user.isTwoFactorAuthEnabled) {
      return user;
    }
    if (payload.isTwoFactorAuthenticated) {
      return user;
    }
    return null;
  }
}