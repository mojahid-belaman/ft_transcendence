import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsService } from 'src/connections/connections.service';
import { Connection } from 'src/connections/entities/connection.entity';
import { Users } from 'src/users/entity/users.entity';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { Channels } from './entity/channels.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channels, Users, Connection])
  ],
  controllers: [ChannelsController, UsersController],
  providers: [ChannelsService, ConnectionsService]
})
export class ChannelsModule{}
