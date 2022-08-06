import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsGateway } from './friendships.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friendships } from './entity/friendships.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entity/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FriendshipsController } from './friendships.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friendships, Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [FriendshipsController],
  providers: [FriendshipsGateway, FriendshipsService, UsersService, JwtService],
})
export class FriendshipsModule {}
