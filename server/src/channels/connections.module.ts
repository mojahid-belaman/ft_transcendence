import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { Channels } from './entity/channels.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channels, Users])
  ],
  controllers: [ChannelsController, UsersController],
  providers: [ChannelsService]
})
export class ChannelsModule{}
