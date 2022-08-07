import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChannelsService } from 'src/channels/channels.service';
import { channelStatus } from 'src/channels/entity/channels.entity';
import { ConnectionsService } from 'src/connections/connections.service';
import { UsersService } from 'src/users/users.service';
import { MessagesChannelsService } from './messages-channels.service';

@WebSocketGateway()
export class MessagesChannelsGateway {

  @Inject()
  private jwtService: JwtService;

  constructor(
    private readonly usersSerive: UsersService,
    private readonly connectionsService: ConnectionsService,
    private readonly channelsService: ChannelsService,
    private readonly messagesChannels: MessagesChannelsService
  ) { }


  @SubscribeMessage("SendMessageChannel")
  async SendMessage(@MessageBody() body, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        const sender = await this.usersSerive.getUserBylogin(user.login);
        const data = { userId: user.userId, channelId: body.channel, content: body.CurentMessage };
        const newMessage = await this.messagesChannels.sendMessage(data);
        const newBody = {
          CurentMessage: newMessage.content,
          user: sender,
          date: newMessage.info
        }
        client.to(body.channel).emit('receiveMessageChannel', newBody)
        client.emit('receiveMessageChannel', newBody)
      }
    }
  }

  @SubscribeMessage("joinChannel")
  async joinCHannel(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        const channel = await this.channelsService.getchannelsByConditon({ id: data });
        if (channel.length === 1) {
          if (channel[0].status !== channelStatus.PRIVATE) {
            const isConnected = await this.connectionsService.checkConnectionExistance(data, user.userId);
            //console.log(data);
            if (isConnected) {
              //console.log("Test Join =>", data);
              client.join(data);
            }
          }
          client.emit("JoinedOrNot", { status: channel[0].status });
        }
      }
    }
  }
}
