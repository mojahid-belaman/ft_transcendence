import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
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
  ) { }

  private onlineUsers = [];
  private inGameUsers = [];
  
  getOnlineUsers() {
    return this.onlineUsers;
  }

  setAUserAsOnline(user) {
    this.onlineUsers.push(user);
  }

  getInGameUsers() {
    return this.inGameUsers;
  }

  setAUserAsInGame(user) {
    this.inGameUsers.push(user);
  }

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
    return this.userRepositroy.findOne({
      where: [condition]
    })
      .then(user => user);
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
    return this.userRepositroy.save({ id: userId, ...info })
      .then(user => {
        return ({
          ...user,
          status: HttpStatus.CREATED,
          message: "success"
        })
      });
  }
}
