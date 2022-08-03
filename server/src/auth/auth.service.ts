import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.getUserBylogin(username);
    if (user) return user;
    return null;
  }

  async login(user: UserDto) {
    const payload = {
      login: user.login,
    };
    return await this.jwtService.sign(payload);
  }
  async tempToken(user: UserDto) {
    const payload = {
      uuid : user.login,
    };
    return await this.jwtService.sign(payload);
  }
}
