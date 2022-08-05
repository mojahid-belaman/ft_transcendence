import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipsService, onlineFriends } from 'src/friendships/friendships.service';
import { Repository } from 'typeorm';
import { MessagesDM } from './entities/messages-dm.entity';

@Injectable()
export class MessagesDmsService {

  constructor(
    @InjectRepository(MessagesDM)
    private messagesDMRepository: Repository<MessagesDM>,
    private friendshipSevice: FriendshipsService
  ){}

  sendMessage(createMessagesDmDto) {
    console.log(createMessagesDmDto);
    return this.messagesDMRepository.save(createMessagesDmDto);
  }

  getAllConversations(userId: string) {
    return this.messagesDMRepository.query(`
      SELECT DISTINCT
        id as "userId",
        username as "name",
        "lastConnected",
        avatar
      FROM USERS
      WHERE
        id::text IN (SELECT "firstId"::text FROM messages_dm WHERE "secondId"::text = '${userId}')
      OR
        id::text IN (SELECT "secondId"::text FROM messages_dm WHERE "firstId"::text = '${userId}')
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({...conv, conversationId: index, isOnline: this.friendshipSevice.checkIfUserOnline(conv.userId) !== undefined}))
      return [];
    })
  }

  findAll(conversationId: string, userId: string) {
    return `This action returns all messagesDms`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagesDm`;
  }
}
