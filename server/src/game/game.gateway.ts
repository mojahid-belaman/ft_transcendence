import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GameVariable } from './Classes/constant';
import { Game } from './Classes/game';
import { Player } from './Classes/player';
import { GameService } from './game.service';

@WebSocketGateway(5001, { cors: { origin: '*' } })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('GameGateway');
  private playerOne: Player;
  private playerTwo: Player;
  private game: Game;
  private sockerArr: Socket[] = [];
  private gameService: GameService;

  afterInit(server: any) {
    this.logger.log('Initial');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Connect Success ' + `${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected ' + `${client.id}`);
  }

  @SubscribeMessage('resize')
  hundle_responsiveGame(client: Socket, payload: any) {
    GameVariable._canvas_Width = payload.cWidth;
    GameVariable._canvas_Height = payload.cHeight;
    GameVariable._paddle_Height = GameVariable._canvas_Height / 6;
    GameVariable._right_Paddle_X =
      GameVariable._canvas_Width - GameVariable._paddle_Width;
    // this.gameService.
  }

  @SubscribeMessage('upPaddle')
  hundle_up_paddle(client: Socket, payload: string) {
    let player: Player = this.game.get_GamePlayer(client);
    if (payload === 'down') {
      player.getPaddle().up('down');
    } else if (payload === 'up') {
      player.getPaddle().up('up');
    }
  }

  @SubscribeMessage('downPaddle')
  hundle_down_paddle(client: Socket, payload: string) {
    let player = this.game.get_GamePlayer(client);
    if (payload === 'down') player.getPaddle().down('down');
    else if (payload === 'up') player.getPaddle().down('up');
  }

  @SubscribeMessage('join_match')
  hundle_join_match(client: Socket, payload: any) {
    this.logger.log('Join Match ' + `${client.id} `);
    this.sockerArr.push(client);
    if (this.sockerArr.length > 1) {
      this.playerOne = new Player(this.sockerArr[0], true);
      this.playerTwo = new Player(this.sockerArr[1], false);
      this.game = new Game(this.playerOne, this.playerTwo);
    }
  }
}
