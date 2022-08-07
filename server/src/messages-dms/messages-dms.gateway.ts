import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { onlineFriends } from 'src/friendships/friendships.service';
import { UsersService } from 'src/users/users.service';
import { MessagesDmsService } from './messages-dms.service';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class MessagesDmsGateway {
  @Inject()
  private jwtService: JwtService;

  @WebSocketServer() server;

  constructor(
    private readonly messagesDmService: MessagesDmsService,
    private readonly usersSerive: UsersService
  ) {}

  @SubscribeMessage("SendMessage")
  async SendMessage(@MessageBody() body, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {

      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        const sender = await this.usersSerive.getUserBylogin(user.login);
        const receiverUser = await this.usersSerive.getUserBylogin(body.receiverLogin);
        const messageToSend = {firstId: sender.id, secondId: receiverUser.id, content: body.CurentMessage}
        const newMessage = await this.messagesDmService.sendMessage(messageToSend)
        const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === receiverUser.id);
        console.log(onlineUser);
        if (onlineUser)
          onlineUser.sockets.forEach(socket => socket.emit("receieveMessage", { CurentMessage: body.CurentMessage, user:{...sender}, date: newMessage.info})) 
      }
    }
  }

}
