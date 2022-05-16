import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channels, channelStatus } from './entity/channels.entity';

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
    if (channelObj.status === channelStatus.PROTECTED && channelObj.password === null)
      throw new ForbiddenException("Password not set for protected channel")
    return this.channelRepository.save(channelObj)
  }
}
