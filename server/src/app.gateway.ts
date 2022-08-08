import { Inject, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
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

@WebSocketGateway({namespace: "chat", cors: { origin: "*" } })

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
        // "undefined"
        if (client.handshake.query && client.handshake.query.token && client.handshake.query.token !== "undefined") {
            const user: any = this.jwtService.decode(String(client.handshake.query.token))
            if (user) {
                this.friendshipsService.setOnlineStatus(user.userId, client);
            }
        }
    }

    async handleDisconnect(client: Socket) {
        this.logger.log('disconnection => ', client.id)
        if (client.handshake.query && client.handshake.query.token && client.handshake.query.token !== "undefined") {
            const user: any = await this.jwtService.decode(String(client.handshake.query.token));
            if (user) {
                //console.log("Disconnect => ", user);
                this.friendshipsService.setOffLineStatus(user.userId, client.id);
                await this.usersService.updateLastTimeConnected(new Date(), user.userId);
            }
        }
    }
}