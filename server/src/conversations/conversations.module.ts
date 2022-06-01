import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversations } from './entity/conversation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversations])
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService]
})
export class ConversationsModule {}
