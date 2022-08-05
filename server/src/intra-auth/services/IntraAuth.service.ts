import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async intraLogin(req) {
    console.log(req.user);
    const userExist = await this.usersService.getUserBylogin(req.user['login']);
    console.log("Login => ", userExist);

    if (!userExist) {
      await this.usersService.addUser(req.user);
      return null;
    }
    return userExist;
  }
}
