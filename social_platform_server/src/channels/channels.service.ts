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

  getchannelsByConditon(condition): Promise<Channels[]> {
    return this.channelRepository.find({
      where: [condition]
    });
  }

  getchannelById(channelId): Promise<Channels> {
    return this.channelRepository.findOne(channelId)
  }

  createChannel(channelObj) {
    return this.channelRepository.save(channelObj)
  }
}
