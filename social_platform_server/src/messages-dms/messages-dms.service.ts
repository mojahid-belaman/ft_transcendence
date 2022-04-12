import { Injectable } from '@nestjs/common';
import { CreateMessagesDmDto } from './dto/create-messages-dm.dto';
import { UpdateMessagesDmDto } from './dto/update-messages-dm.dto';

@Injectable()
export class MessagesDmsService {
  create(createMessagesDmDto: CreateMessagesDmDto) {
    return 'This action adds a new messagesDm';
  }

  findAll() {
    return `This action returns all messagesDms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messagesDm`;
  }

  update(id: number, updateMessagesDmDto: UpdateMessagesDmDto) {
    return `This action updates a #${id} messagesDm`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagesDm`;
  }
}
