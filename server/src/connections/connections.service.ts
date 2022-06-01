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

  create(createConnectionDto) {
    return this.connectionsRepository.findOne({
      where: [createConnectionDto]
    })
    .then(data => {
      if (data)
        throw new ForbiddenException("Already Connected");
      return this.connectionsRepository.save(createConnectionDto)
    })
  }

  findAll(condition) {
    // return this.connectionsRepository.find({
    //   where: [condition]
    // }); connection."channelId"
    return this.connectionsRepository.query(`
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

  findOne(condition) {
    // return this.connectionsRepository.findOne({
    //   where: [condition]
    // });
    // {id: id, user: req.user.userId}    
    return this.connectionsRepository.query(`
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

  delete(condition) {
    return this.connectionsRepository.delete(condition)
  }
}
