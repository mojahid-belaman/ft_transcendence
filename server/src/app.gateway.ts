import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() server: Server;
  private logger = new Logger('AppGateway');
  
  afterInit(server: Server) {
    this.logger.log('Initial');
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected  ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected  ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('MsgToClient', payload);
  }
}
