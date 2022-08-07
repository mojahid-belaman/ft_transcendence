import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, connectionStatus } from './entities/connection.entity';
import { CronJob } from 'cron';
import { onlineFriends } from 'src/friendships/friendships.service';


@Injectable()
export class ConnectionsService {

  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>
  ) { }

  async create(createConnectionDto) {
    return await this.connectionsRepository.findOne({
      where: [createConnectionDto]
    })
      .then(async data => {
        console.log(createConnectionDto);

        if (data)
          throw new ForbiddenException("Already Connected");
        return await this.connectionsRepository.save(createConnectionDto)
      })
  }

  async getAll() {
    return await this.connectionsRepository.query(`
      SELECT
        channels.id as "channelId",
        channels.name,
        channels.avatar,
        channels."ownerId",
        channels.status,
        channels.date as "channelCreationDate"
      FROM connection
      JOIN channels ON (connection."channelId"::text = channels.id::text)
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({ ...conv, conversationId: index }))
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
        channels.status,
        channels.date as "channelCreationDate"
      FROM connection
      JOIN channels ON (connection."channelId"::text = channels.id::text)
      WHERE connection."userId" = '${condition.user}'
    `).then(convs => {
      if (convs && convs.length !== 0)
        return convs.map((conv, index) => ({ ...conv, conversationId: index }))
      return [];
    });
  }

  async findOneWithTypeORM(userId: string, channelId: string) {
    return await this.connectionsRepository.findOne({
      where: { userId, channelId }
    })
  }

  async findOne(condition) {
    return await this.connectionsRepository.query(`
      SELECT
        connection.id as "connectionId",
        connection.status,
        connection.date,
        channels.name,
        channels.id as "ChannelId"
      FROM connection
      JOIN channels ON (connection."channelId"::text = channels.id::text)
      WHERE connection.id::text = '${condition.id}' AND connection."userId" = '${condition.user}'
    `);
  }

  async checkConnectionExistance(channelId: string, userId: string) {
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

  async delete(id: string, deleterId: string, channelId: string) {
    const getDeleterIdConnection = await this.findOneWithTypeORM(deleterId, channelId);
    const getDeletedIdConnection = await this.findOneWithTypeORM(id, channelId);
    if (getDeleterIdConnection.status !== connectionStatus.ADMIN && getDeleterIdConnection.status !== connectionStatus.OWNER)
      throw new UnauthorizedException("Not an Admin or an Onwer")

    if (getDeletedIdConnection.status === connectionStatus.OWNER && getDeleterIdConnection.status === connectionStatus.ADMIN)
      throw new UnauthorizedException("Admin cant delete Owner")

    if (getDeletedIdConnection.status === connectionStatus.OWNER && getDeleterIdConnection.status === connectionStatus.OWNER) {
      return await this.connectionsRepository.delete({ channelId }).
        then(
          async () =>
            await this.connectionsRepository.query(`DELETE FROM channels WHERE id::text='${channelId}' `))
        .then(async (channelDeleted) =>
          await this.connectionsRepository.query(`DELETE FROM messages_channel WHERE "channelId"::text='${channelId}' `))
        .then(res => ({ status: 200 }))
    }
    return await this.connectionsRepository.delete({ userId: id })
  }

  checkSatus(userId) {
    return this.connectionsRepository.findOne({
      where: [{ userId }]
    }).then(res => {
      if (!res)
        throw new NotFoundException("User Not Found");
      return res.status
    })
  }

  async getMembersById(channelId: string) {
    return await this.connectionsRepository.query(`
    SELECT
      connection.id as "connectionId",
      connection.status,
      connection.date,
      users.id as "userId",
      users.username,
      users.avatar,
      users.email
    FROM connection
    JOIN users ON (connection."userId"::text = users.id::text)
    WHERE connection."channelId"::text = '${channelId}'
    `).then(res => {
      if (res)
        return res;
      return [];
    })
  }

  async findConnection(channelId: string, userId: string) {
    return await this.connectionsRepository.findOne({
      where: [{ userId, channelId }]
    }).then(res => {
      console.log(res);
      if (!res)
        throw new NotFoundException("Connection Not Found")
      return res
    })
  }

  async changeStatus(userId, adminId, body, channelId) {
    if (!body.status)
      throw new ForbiddenException("No status provided")
    const adminConnection = await this.connectionsRepository.findOne({
      where: [{ userId: adminId, channelId }]
    })
    if (adminConnection.status !== connectionStatus.ADMIN && adminConnection.status !== connectionStatus.OWNER)
      throw new UnauthorizedException("Not an Admin");
    const changingConnection = await this.connectionsRepository.findOne({
      where: [{ userId, channelId }]
    })
    if (!changingConnection)
      throw new NotFoundException("No connection Found");
    changingConnection.status = body.status;
    return await this.connectionsRepository.save(changingConnection);
  }

  async muteMember(channelId: string, userId: string, date: Date, adminId: string) {
    if (!date)
      throw new ForbiddenException("No date provided")
    const adminConnection = await this.connectionsRepository.findOne({
      where: [{ userId: adminId, channelId }]
    })
    if (adminConnection.status !== connectionStatus.ADMIN && adminConnection.status !== connectionStatus.OWNER)
      throw new UnauthorizedException("Not an Admin");
    const mutedConnection = await this.connectionsRepository.findOne({
      where: [{ userId, channelId }]
    })
    if (!mutedConnection)
      throw new NotFoundException("No connection Found");
    const prevStatus = mutedConnection.status;
    mutedConnection.status = connectionStatus.BLOCKED;
    const test = await this.connectionsRepository.save(mutedConnection);
    console.log("Testing the mute => ", test);
    const clientSockets = onlineFriends.find(online => online.id == mutedConnection.userId);
    if (clientSockets)
      clientSockets.sockets.forEach(socket => socket.emit("channelConnectionStatusChange",{
        status: mutedConnection.status,
        error: "You've been Muted"
      }));
    const newDate = new Date()
    const tmp = new Date(newDate.getTime() + 1 * 60000);
    const job = new CronJob(tmp, async () => {
      mutedConnection.status = prevStatus;
      console.log("DEBUG => AFTER ONE MINUTE");
      console.log(onlineFriends);
      await this.connectionsRepository.save(mutedConnection);
      const clientSockets = onlineFriends.find(online => online.id == mutedConnection.userId);
    if (clientSockets)
      clientSockets.sockets.forEach(
        socket => socket.emit("channelConnectionStatusChange", { status: prevStatus }));
    });
    job.start();
  }
}
