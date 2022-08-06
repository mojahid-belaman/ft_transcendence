import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from './entities/connection.entity';

@Injectable()
export class ConnectionsService {

  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>    
  ) {}

  async create(createConnectionDto) {
    return await this.connectionsRepository.findOne({
      where: [createConnectionDto]
    })
    .then(async data => {
      if (data)
        throw new ForbiddenException("Already Connected");
      return await this.connectionsRepository.save(createConnectionDto)
    })
  }

  /* 
  { conversationId: 0, channelId: 1, name: "annoucement" ,status:"private"}
  */

  async getAll() {
    return await this.connectionsRepository.query(`
      SELECT
        channels.id as "channelId",
        channels.name,
        channels.avatar,
        channels."ownerId",
        channels.image as "channelImage"
        channels.status,
        channels.date as "channelCreationDate"
      FROM connection
      JOIN channels ON (connection."channelId"::text = channels.id::text)
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({ ...conv, conversationId: index}))
      return [];
    });
  }

  async findAll(condition) {
    return await this.connectionsRepository.query(`
      SELECT
        connection.id as "connectionId",
        connection.status,
        connection.date,
        channels.id as "channelId",
        channels.name,
        channels.avatar,
        channels."ownerId",
        channels.image as "channelImage"
        channels.status,
        channels.date as "channelCreationDate"
      FROM connection
      JOIN channels ON (connection."channelId"::text = channels.id::text)
      WHERE connection."userId" = '${condition.user}'
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({ ...conv, conversationId: index}))
      return [];
    });
  }

  async findOne(condition) {
    return await this.connectionsRepository.query(`
      SELECT
        connection.id as "connectionId",
        connection.status,
        connection.date,
        channels.name,
        channels.id as "ChannelId",
        channels.image as "channelImage"
      FROM connection
      JOIN channels ON (connection."channelId"::text = channels.id::text)
      WHERE connection.id::text = '${condition.id}' AND connection."userId" = '${condition.user}'
    `);
  }

  async checkConnectionExistance (channelId: string, userId: string) {
    return await this.connectionsRepository.query(`
      SELECT
        "userId",
        "channelId"
      FROM connection
      WHERE "userId"::text = '${channelId}' AND "channelId" = '${userId}'
    `).then(res => {
      if (res)
        return true;
      return false;
    });
  }

  async delete(condition) {
    return await this.connectionsRepository.delete(condition)
  }
}
