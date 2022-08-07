import { Module } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { MessagesDmsController } from './messages-dms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesDM } from './entities/messages-dm.entity';
import { MessagesDmsGateway } from './messages-dms.gateway';
import { FriendshipsService } from 'src/friendships/friendships.service';
import { Friendships } from 'src/friendships/entity/friendships.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entity/users.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesDM, Friendships, Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [MessagesDmsController],
  providers: [
    MessagesDmsService,
    MessagesDmsGateway,
    FriendshipsService,
    JwtService,
    UsersService]
})
export class MessagesDmsModule {}
