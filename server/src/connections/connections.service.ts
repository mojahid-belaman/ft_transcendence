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

  async findAll(condition) {
    // return this.connectionsRepository.find({
    //   where: [condition]
    // }); connection."channelId"
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
      WHERE connection."userId" = '${condition.user}'
    `);
  }

  async findOne(condition) {
    // return this.connectionsRepository.findOne({
    //   where: [condition]
    // });
    // {id: id, user: req.user.userId}    
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

  async delete(condition) {
    return await this.connectionsRepository.delete(condition)
  }
}
