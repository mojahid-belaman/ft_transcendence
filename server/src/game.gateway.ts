import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Game } from './game/Classes/game';
import { Player } from './game/Classes/player';

@WebSocketGateway(5001, {cors: {origin: "http://localhost:3000"}})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    private logger: Logger = new Logger('GameGateway');
    private game: Game;
    private playerOne: Player;
    private playerTwo: Player;
    private sockerArr: Socket[] = [];

    afterInit(server: any) {
        this.logger.log('Initial');
    }
    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('Connect Success ' + `${client.id}`)
    }
    handleDisconnect(client: Socket) {
        this.logger.log('Disconnected');
    }

    @SubscribeMessage('join_match')
    hundle_join_match(client: Socket, payload: any) {
        this.logger.log('Connect to server ' + `${client.id}`)
        this.playerOne = new Player(client, true);
        // this.playerTwo = new Player(this.sockerArr[0], false);
        this.game = new Game(this.playerOne);
    }
  
}
