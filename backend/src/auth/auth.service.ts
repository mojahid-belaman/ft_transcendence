import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createUserDto } from 'src/users/users.create.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor (private readonly userService: UsersService) {}

    async register({email, psw}: createUserDto) {
         try {
             const hashPsw =  await bcrypt.hash(psw, 12);
             const user = await this.userService.create({email, psw:hashPsw});
             return user;
         } catch (error) {
             throw new HttpException(error, HttpStatus.BAD_REQUEST);
         }
    }
}