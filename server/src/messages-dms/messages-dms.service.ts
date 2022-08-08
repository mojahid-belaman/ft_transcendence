import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipStatus } from 'src/friendships/entity/friendships.entity';
import { FriendshipsService, onlineFriends } from 'src/friendships/friendships.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { MessagesDM } from './entities/messages-dm.entity';

@Injectable()
export class MessagesDmsService {

  constructor(
    @InjectRepository(MessagesDM)
    private messagesDMRepository: Repository<MessagesDM>,
    private friendshipSevice: FriendshipsService,
    private usersService: UsersService
  ) { }

  sendMessage(createMessagesDmDto) {
    return this.messagesDMRepository.save(createMessagesDmDto);
  }

  async sendMessageOrGoTo(createMessagesDmDto) {
    return this.messagesDMRepository.find({
      where: [{ firstId: createMessagesDmDto.firstId, secondId: createMessagesDmDto.secondId }]
    }).then((async (res) => {
      console.log(res);
      if (res.length === 0)
        return await this.sendMessage(createMessagesDmDto);
      return res;
    }));
  }

  getAllConversations(userId: string) {
    return this.messagesDMRepository.query(`
      SELECT DISTINCT
        id as "userId",
        username as "name",
        "lastConnected",
        avatar,
        login
      FROM USERS
      WHERE
        id::text IN (SELECT "firstId"::text FROM messages_dm WHERE "secondId"::text = '${userId}')
      OR
        id::text IN (SELECT "secondId"::text FROM messages_dm WHERE "firstId"::text = '${userId}')
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({ ...conv, conversationId: index, isOnline: this.friendshipSevice.checkIfUserOnline(conv.userId) !== undefined }))
      return [];
    })
  }

  async findAll(login: string, userId: string) {
    const user = await this.usersService.getUserBylogin(login);
    const friendship = await this.friendshipSevice.getFriendshipStatus(user.id, userId);
    if (friendship && friendship.status === FriendshipStatus.ACCEPTED)
      return this.messagesDMRepository.find({
        where: [{ firstId: userId, secondId: user.id }, { firstId: user.id, secondId: userId }],
        order: { info: "ASC" }
      }).then(async (messages) => Promise.all(messages.map(async (message) => {
        return (message.firstId == userId) ? await this.usersService.getUserById(userId)
          .then(receiverUser => {
            const object = ({ CurentMessage: message.content, user: receiverUser, date: message.info })
            //console.log(object);
            return object
          }) : await this.usersService.getUserById(user.id)
            .then(receiverUser => ({ CurentMessage: message.content, user: receiverUser, date: message.info }))
      }))).then(async (messages) => {
        return ({
          user: await this.usersService.getUserById(userId),
          messages
        })
      })
    return { friendshipStatus: friendship.status, message: "It is a blocked conversation" }
  }
}
