import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelsService } from 'src/channels/channels.service';
import { channelStatus } from 'src/channels/entity/channels.entity';
import { ConnectionsService } from 'src/connections/connections.service';
import { connectionStatus } from 'src/connections/entities/connection.entity';
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
    private usersService: UsersService,
    private connectionService: ConnectionsService,
    private channelsService: ChannelsService
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

  async findAll(channelId: string, userId: string) {
    const channelObject = await this.channelsService.getchannelById(channelId);
    const userConnection = await this.connectionService.findConnection(channelId, userId)
    if (userConnection && userConnection.status === connectionStatus.BLOCKED) {
      throw new UnauthorizedException("You are blocked")
    }
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
