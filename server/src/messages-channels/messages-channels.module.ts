import { Module } from '@nestjs/common';
import { MessagesChannelsService } from './messages-channels.service';
import { MessagesChannelsController } from './messages-channels.controller';
import { MessagesChannelsGateway } from './messages-channels.gateway';

@Module({
  controllers: [MessagesChannelsController],
  providers: [MessagesChannelsService, MessagesChannelsGateway]
})
export class MessagesChannelsModule {}
