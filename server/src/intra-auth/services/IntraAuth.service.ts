import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async intraLogin(user) {
    console.log("user => ", user);

    const userExist = await this.usersService.getUserBylogin(user['login']);
    console.log("userExist => ", userExist);
    if (!userExist) 
      return await this.usersService.addUser(user)
      .catch(() => {
        throw new BadRequestException();
      });
    return userExist;
  }
}
