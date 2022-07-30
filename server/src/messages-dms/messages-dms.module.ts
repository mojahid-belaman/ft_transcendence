import { Module } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { MessagesDmsController } from './messages-dms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesDM } from './entities/messages-dm.entity';
import { MessagesDmsGateway } from './messages-dms.gateway';
import { FriendshipsService } from 'src/friendships/friendships.service';
import { Friendships } from 'src/friendships/entity/friendships.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesDM, Friendships])
  ],
  controllers: [MessagesDmsController],
  providers: [MessagesDmsService, MessagesDmsGateway, FriendshipsService]
})
export class MessagesDmsModule {}
