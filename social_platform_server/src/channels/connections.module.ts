import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { Channels } from './entity/channels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channels])
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule{}
