import { Module } from '@nestjs/common';
import { MessagesChannelsService } from './messages-channels.service';
import { MessagesChannelsController } from './messages-channels.controller';

@Module({
  controllers: [MessagesChannelsController],
  providers: [MessagesChannelsService]
})
export class MessagesChannelsModule {}
