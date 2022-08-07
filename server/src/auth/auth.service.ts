import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.getUserBylogin(username);
    if (user) return user;
    return null;
  }

  async login(user: any) {
    const payload = {
      userId: user.id,
      login: user.login
    };
    return await this.jwtService.sign(payload);
  }
  async tfaToken(user: UserDto) {
    const payload = {
      userId: user.id
    };
    return await this.jwtService.sign(payload);
  }

  async validate(payload: any){
    const user = this.usersService.getUserBylogin(payload.login);
    // if (user)
  }
}
