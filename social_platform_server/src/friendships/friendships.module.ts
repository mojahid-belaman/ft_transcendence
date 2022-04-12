import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';

@Module({
  controllers: [FriendshipsController],
  providers: [FriendshipsService]
})
export class FriendshipsModule {}
