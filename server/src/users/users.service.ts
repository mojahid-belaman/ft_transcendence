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

  async getAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async getUsers(userId: string): Promise<Users[]> {
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

  async getUserById(id: string): Promise<Users> {
    const userCreated = new Users();
    userCreated.id = id;
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
    userCreated.qrCode = '';
    userCreated.isTwoFactorAuthEnabled = false;
    userCreated.twoFactorAuthenticationSecret = '';
    return this.userRepository.save(userCreated);
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
        return await this.userRepository.save({...user, lastConnected: info})
        .then(res => {
          return res;
        })
      });
  }

  
  async updateUsername(login: string, username: string): Promise<Users | boolean>{
    const updatedUser = await this.getUserBylogin(login);
    if (username) {
      updatedUser.username = username;
     return this.userRepository.save(updatedUser).then((res) => res).catch(() => false)
    };
    return false;
  }

  async updateAvatarUrl(updatedUser: Users, avatar: string): Promise<Users> {
    if (avatar) {
      updatedUser.avatar = `${process.env.BACK_END_URI}/` + avatar;
    }
    return this.userRepository.save(updatedUser);
  }

  async Enable2FA(user: Users): Promise<Users> {
      user.isTwoFactorAuthEnabled = true;
    return this.userRepository.save(user);
  }
  
  async setTwoFactorAuthenticationSecret(secret: string, user: Users) {
    user.twoFactorAuthenticationSecret = secret;
    return this.userRepository.save(user);
  }

  
  async turnOnTwoFactorAuthentication(login: string) {
    const user = await this.getUserBylogin(login);
    user.isTwoFactorAuthEnabled = true;
    return this.userRepository.save(user);
  }

  async unSet2FASecret(login: string) {
    const user = await this.getUserBylogin(login);
    user.twoFactorAuthenticationSecret = '';
    user.qrCode='';
    user.isTwoFactorAuthEnabled = false;
    return this.userRepository.save(user);
  }

  async updateqrCode(user: Users, qrCode: string): Promise<Users>{
    user.qrCode = qrCode;
    return this.userRepository.save(user);
  }

}
