import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsGateway } from './friendships.gateway';
import { FriendshipsController } from './friendships.controller';

@Module({
  providers: [FriendshipsGateway, FriendshipsService],
  controllers: [FriendshipsController]
})
export class FriendshipsModule {}
