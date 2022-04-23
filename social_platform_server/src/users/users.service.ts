import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { users } from 'src/db';
import {
  CreateUserDto,
  FindUserResponsDto,
  UpdateUserDto,
} from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private userRepositroy: Repository<Users>
  ) {}

  getUsers(): Promise<Users[]> {
    return this.userRepositroy.find()
    .then(data => {
      return data.map(user => {
        delete user.password
        return user;
      })
    });
  }
  findOne(condition): Promise<Users> {
    return this.userRepositroy.findOne(condition)
    .then(user => {
      delete user.password;
      return user;
    });
  }
  createUser(newUser: CreateUserDto) {
    return this.userRepositroy.save(newUser)
    .then((user) => {
      return ({
        ...user,
        status: HttpStatus.CREATED,
        message: "success"
      })
    });
  }
  updateUser(info: UpdateUserDto, userId: string) {
    return this.userRepositroy.save({id: userId, ...info})
    .then(user => {
      return ({
        ...user,
        status: HttpStatus.CREATED,
        message: "success"
      })
    });
  }
}
