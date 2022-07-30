import { Injectable } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  async intraLogin(req) {
    const userExist = await this.usersService.getUserBylogin(req.user['login']);
    if (!userExist) {
      await this.usersService.addUser(req.user);
      return null;
    }
    return userExist;
  }
}
