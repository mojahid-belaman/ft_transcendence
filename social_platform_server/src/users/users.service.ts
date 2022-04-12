import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { users } from 'src/db';
import {
  CreateUserDto,
  FindUserResponsDto,
  UpdateUserDto,
  UserResponseDto,
} from './dto/users.dto';

@Injectable()
export class UsersService {
  private users = users;
  getUsers(): FindUserResponsDto[] {
    return this.users;
  }
  getUserById(userId: string): FindUserResponsDto {
    return this.users.find((user) => {
      return user.id == userId;
    });
  }
  createUser(info: CreateUserDto): UserResponseDto {
    let newUser = {
      id: uuid(),
      ...info,
    };
    this.users.push(newUser);
    return newUser;
  }
  updateUser(info: UpdateUserDto, userId: string) {
    let updatedUser: UserResponseDto;
    const updateUserList = this.users.map((user) => {
      if (userId === user.id) {
        updatedUser = {
          id: userId,
          ...info,
        };
        return updatedUser;
      } else return user;
    });
    this.users = updateUserList;
    return updatedUser;
  }
}
