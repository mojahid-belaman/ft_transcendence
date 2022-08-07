import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionsService } from 'src/connections/connections.service';
import { connectionStatus } from 'src/connections/entities/connection.entity';
import { Repository } from 'typeorm';
import { Channels, channelStatus } from './entity/channels.entity';

@Injectable()
export class ChannelsService {

  constructor(
    @InjectRepository(Channels)
    private channelRepository: Repository<Channels>,
    private connectionsService: ConnectionsService
  ) {}

  async getChannels() {
      return await this.channelRepository.query(`
        SELECT
          channels.id as "channelId",
          channels.name,
          channels."ownerId",
          channels.status,
          channels.description,
          channels.date as "channelCreationDate"
        FROM channels
      `).then(convs => {
        if (convs && convs.length !== 0)
          return convs.map((conv, index) => ({ ...conv, conversationId: index}))
        return [];
      });
  }

  async getchannelsByConditon(condition): Promise<Channels[]> {
    return await this.channelRepository.find({
      where: [condition]
    });
  }

  async getchannelById(channelId): Promise<Channels> {
    return await this.channelRepository.findOne(channelId)
  }

  async createChannel(channelObj) {
    if (channelObj.status === channelStatus.PROTECTED && channelObj.password === null)
      throw new ForbiddenException("Password not set for protected channel")
    return await this.channelRepository.save(channelObj)
    .then(async (channel) => {
      await this.connectionsService.create({channelId: channel.id, userId: channel.ownerId, status: connectionStatus.OWNER})
      return channel;
    })
  }
}
