import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
} from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import {toFileStream} from 'qrcode'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
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
    return await this.userRepository.find({
      where: {id: Not(userId)}
    })
      .then(data => {
        return data.map(user => {
          delete user.password
          return user;
        })
      });
  } */

  getAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async getUsers(userId: string): Promise<Users[]> {
    console.log(userId);
    return await this.userRepository.query(`
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
    return await this.userRepository.find({
      where: userIds.map(userId => ({id: userId}))
    })
  }

  async getUserBylogin(login: string): Promise<Users> {
    const userCreated = new Users();
    userCreated.login = login;
    const usrFound = await this.userRepository.findOne(userCreated);
    return usrFound;
  }

  async addUser(user: Users) {
    const userCreated = new Users();
    userCreated.login = user.login;
    userCreated.email = user.email;
    userCreated.username = user.username;
    userCreated.lastConnected = null;
    userCreated.avatar = user.avatar;
    userCreated.changedAvatar = false;
    userCreated.isTwoFactorAuthEnabled = false;
    userCreated.isTwoFactorAuthenticated = false;
    userCreated.twoFactorAuthenticationSecret = '';
    const newUser = this.userRepository.create(userCreated);
    return this.userRepository.insert(newUser);
  }


  async findOne(condition): Promise<Users> {
    return await this.userRepository.findOne({
      where: [condition]
    })
      .then(user => {
        return user
      });
  }
  async createUser(newUser: CreateUserDto) {
    return await this.userRepository.save(newUser)
      .then((user) => {
        return ({
          ...user,
          status: HttpStatus.CREATED,
          message: "success"
        })
      });
  }
  async updateUser(info: UpdateUserDto, userId: string) {
    return await this.userRepository.save({ id: userId, ...info })
      .then(user => {
        return ({
          ...user,
          status: HttpStatus.CREATED,
          message: "success"
        })
      });
  }

  async updateLastTimeConnected(info: Date, userId: string) {
    return await this.userRepository.findOne({ id: userId })
      .then(async (user) => {
        console.log(user);
        return await this.userRepository.save({...user, lastConnected: info})
        .then(res => {
          console.log(res);
          return res;
        })
      });
  }

  async updateUsername(login: string, username: string): Promise<Users> {
    const updatedUser = await this.getUserBylogin(login);
    if (username) updatedUser.username = username;
    return this.userRepository.save(updatedUser);
  }

  async updateAvatarUrl(updatedUser: Users, avatar: string): Promise<Users> {
    if (avatar) {
      updatedUser.avatar = avatar;
      updatedUser.changedAvatar = true;
    }
    return this.userRepository.save(updatedUser);
  }

  async EnableDisable2FA(login: string, is2FA: boolean): Promise<Users> {
    const user = await this.getUserBylogin(login);
      user.isTwoFactorAuthEnabled = is2FA;
    return this.userRepository.save(user);
  }
  
  async setTwoFactorAuthenticationSecret(secret: string, login: string) {
    const user = await this.getUserBylogin(login);
    user.twoFactorAuthenticationSecret = secret;
    return this.userRepository.save(user);
  }

  
  async turnOnTwoFactorAuthentication(login: string) {
    const user = await this.getUserBylogin(login);
    user.isTwoFactorAuthenticated = true;
    return this.userRepository.save(user);
  }

  async unSet2FASecret(login: string) {
    const user = await this.getUserBylogin(login);
    user.twoFactorAuthenticationSecret = null;
    user.isTwoFactorAuthenticated = false;
    return this.userRepository.save(user);
  }

}
