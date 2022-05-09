import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Game } from './game/Classes/game';
import { Player } from './game/Classes/player';

@WebSocketGateway(5001, {cors: {origin: "http://localhost:3000"}})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    private logger: Logger = new Logger('GameGateway');
    private playerOne: Player;
    private playerTwo: Player;
    private game: Game;
    private sockerArr: Socket[] = [];
    
    afterInit(server: any) {
        this.logger.log('Initial');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('Connect Success ' + `${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.logger.log('Disconnected ' + `${client.id}`);
    }

    @SubscribeMessage('upPaddle')
    hundle_up_paddle(client: Socket, payload: any) {
        let player: Player = this.game.get_GamePlayer(client);
        player.getPaddle().up();
        
    }
    
    @SubscribeMessage('downPaddle')
    hundle_down_paddle(client: Socket, payload: any) {
        let player = this.game.get_GamePlayer(client);
        player.getPaddle().down();
    }

    @SubscribeMessage('join_match')
    hundle_join_match(client: Socket, payload: any) {
        this.logger.log('Join Match ' + `${client.id}`)
        this.sockerArr.push(client);
        if (this.sockerArr.length > 1) {
            this.playerOne = new Player(this.sockerArr[0], true);
            this.playerTwo = new Player(this.sockerArr[1], false);
            this.game = new Game(this.playerOne, this.playerTwo);
        }
    }
}
