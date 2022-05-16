import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friendship } from './entities/friendship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friendship])
  ],
  controllers: [FriendshipsController],
  providers: [FriendshipsService]
})
export class FriendshipsModule {}
