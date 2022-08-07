import { Module } from '@nestjs/common';
import { MessagesChannelsService } from './messages-channels.service';
import { MessagesChannelsController } from './messages-channels.controller';
import { MessagesChannelsGateway } from './messages-channels.gateway';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { MessagesChannel } from './entities/messages-channel.entity';
import { Friendships } from 'src/friendships/entity/friendships.entity';
import { FriendshipsService } from 'src/friendships/friendships.service';
import { ConnectionsService } from 'src/connections/connections.service';
import { Connection } from 'src/connections/entities/connection.entity';
import { ChannelsService } from 'src/channels/channels.service';
import { Channels } from 'src/channels/entity/channels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Friendships, MessagesChannel, Connection, Channels]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [MessagesChannelsController],
  providers: [
    MessagesChannelsService,
    MessagesChannelsGateway,
    JwtService,
    UsersService,
    FriendshipsService,
    ConnectionsService,
    ChannelsService
  ]
})
export class MessagesChannelsModule {}
