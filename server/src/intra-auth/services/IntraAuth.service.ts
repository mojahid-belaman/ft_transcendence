import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async intraLogin(req) {
    const userExist = await this.usersService.getUserBylogin(req.user['login']);
    if (!userExist) 
      return await this.usersService.addUser(req.user);
    return userExist;
  }
}
