import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesDM } from './entities/messages-dm.entity';

@Injectable()
export class MessagesDmsService {

  constructor(
    @InjectRepository(MessagesDM)
    private messagesDMRepository: Repository<MessagesDM>
  ){}

  sendMessage(createMessagesDmDto) {
    return this.messagesDMRepository.save(createMessagesDmDto);
  }

  findAll(conversationId: string, userId: string) {
    return `This action returns all messagesDms`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagesDm`;
  }
}
