import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
} from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Not, Repository } from 'typeorm';
import { Socket } from 'socket.io';

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

  /* async getUsers(userId: string): Promise<Users[]> {
    return await this.userRepositroy.find({
      where: {id: Not(userId)}
    })
      .then(data => {
        return data.map(user => {
          delete user.password
          return user;
        })
      });
  } */

  async getUsers(userId: string): Promise<Users[]> {
    return await this.userRepositroy.query(`
      SELECT
        *
      FROM USERS
      WHERE 
        id::text != '${userId}'
      AND
        id::text NOT IN (SELECT "firstId"::text FROM friendships WHERE "secondId"::text = '${userId}')
      AND
        id::text NOT IN (SELECT "secondId"::text FROM friendships WHERE "firstId"::text = '${userId}')
    `)
      .then(data => {
        if (data && data.length !== 0)
          return data.map(user => {
            delete user.password
            return user;
          })
        return [];
      });
  }

  async getMultipleUsers(userIds: string[]) {
    return await this.userRepositroy.find({
      where: userIds.map(userId => ({id: userId}))
    })
  }

  async findOne(condition): Promise<Users> {
    return await this.userRepositroy.findOne({
      where: [condition]
    })
      .then(user => user);
  }
  async createUser(newUser: CreateUserDto) {
    return await this.userRepositroy.save(newUser)
      .then((user) => {
        return ({
          ...user,
          status: HttpStatus.CREATED,
          message: "success"
        })
      });
  }
  async updateUser(info: UpdateUserDto, userId: string) {
    return await this.userRepositroy.save({ id: userId, ...info })
      .then(user => {
        return ({
          ...user,
          status: HttpStatus.CREATED,
          message: "success"
        })
      });
  }

  async updateLastTimeConnected(info: Date, userId: string) {
    return await this.userRepositroy.findOne({ id: userId })
      .then(async (user) => {
        console.log(user);
        return await this.userRepositroy.save({...user, lastConnected: info})
        .then(res => {
          console.log(res);
          return res;
        })
      });
  }
}
