import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async intraLogin(user) {

    const userExist = await this.usersService.getUserBylogin(user['login']);
    if (!userExist) 
      return await this.usersService.addUser(user)
      .then(newUser => ({...newUser, isFirstTime: true}))
      .catch(() => {
        throw new BadRequestException();
      });
    return ({...userExist, isFirstTime: false});
    // return userExist;
  }
}
