import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channels } from './entity/channels.entity';

@Injectable()
export class ChannelsService {

  constructor(
    @InjectRepository(Channels)
    private channelRepository: Repository<Channels>
  ) {}

  getchannels(): Promise<Channels[]> {
    return this.channelRepository.find();
  }

  getchannelById(channelId): Promise<Channels> {
    return this.channelRepository.findOne(channelId)
  }
}
