import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipsService } from 'src/friendships/friendships.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessagesChannelDto } from './dto/create-messages-channel.dto';
import { UpdateMessagesChannelDto } from './dto/update-messages-channel.dto';
import { MessagesChannel } from './entities/messages-channel.entity';

@Injectable()
export class MessagesChannelsService {

  constructor(
    @InjectRepository(MessagesChannel)
    private messagesChannelRepository: Repository<MessagesChannel>,
    private friendshipSevice: FriendshipsService,
    private usersService: UsersService
  ) { }


  getAllChannels(userId: string) {
    return this.messagesChannelRepository.query(`
      SELECT DISTINCT
        id as "channelId",
        name,
        status,
        avatar,
        "ownerId",
        date,
        image
      FROM channels
      WHERE
        id::text IN (SELECT "channelId"::text FROM messages_dm WHERE "userId"::text = '${userId}')
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({ ...conv, conversationId: index }))
      return [];
    })
  }

  sendMessage(createMessagesDmDto: CreateMessagesChannelDto) {
    return this.messagesChannelRepository.save(createMessagesDmDto);
  }

  async findAll(channelId: string) {
    return this.messagesChannelRepository.find({
      where: [{ channelId: channelId }],
      order: { info: "ASC" }
    }).then(async (messages) => Promise.all(messages.map(async (message) => {
      return await this.usersService.getUserById(message.userId)
        .then(receiverUser => ({
          CurentMessage: message.content,
          user: receiverUser,
          date: message.info
        }))
    })))
  }
}
