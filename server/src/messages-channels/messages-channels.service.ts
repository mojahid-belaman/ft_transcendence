import { Injectable } from '@nestjs/common';
import { CreateMessagesChannelDto } from './dto/create-messages-channel.dto';
import { UpdateMessagesChannelDto } from './dto/update-messages-channel.dto';

@Injectable()
export class MessagesChannelsService {
  create(createMessagesChannelDto: CreateMessagesChannelDto) {
    return 'This action adds a new messagesChannel';
  }

  findAll() {
    return `This action returns all messagesChannels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messagesChannel`;
  }

  update(id: number, updateMessagesChannelDto: UpdateMessagesChannelDto) {
    return `This action updates a #${id} messagesChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagesChannel`;
  }
}
