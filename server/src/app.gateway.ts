import { Inject, Logger } from '@nestjs/common';
import { Socket ,Server} from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { FriendshipsService } from './friendships/friendships.service';

@WebSocketGateway({
    cors: {
        origin: '*',
        },
})

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;
    @Inject()
    private jwtService: JwtService;
    @Inject()
    private friendshipsService: FriendshipsService;
    @Inject()
    private usersService: UsersService;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('init')
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('connection => ' + client.id)
        if (client.handshake.query && client.handshake.query.token) {
            const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
                secret: process.env.JWT_SECRET
            })
            // console.log("User => ", user);
            
            if (user) {
                this.friendshipsService.setOnlineStatus(user.id, client);                
            }
        }
    }

    async handleDisconnect(client: Socket) {
        this.logger.log('disconnection')
        if (client.handshake.query && client.handshake.query.token) {
            const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
                secret: process.env.JWT_SECRET
            });
            if (user) {
                this.friendshipsService.setOffLineStatus(user.id, client.id);
                this.usersService.updateLastTimeConnected(new Date(), user.id);
            }
        }
    }
}