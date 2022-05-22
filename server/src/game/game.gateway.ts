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
  //NOTE - Create Object Of Player
  private playerOne: Player;
  private playerTwo: Player;
  //NOTE - Array Of Game and every Game has two Players
  private game: Game[] = [];
  //NOTE - Players In Array Of Set (client.Id not repeat)
  private socketArr: Set<Socket> = new Set<Socket>();

  afterInit(server: any) {
    this.logger.log('Initial');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Connect Success ' + `${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected ' + `${client.id}`);
    let gameFound = this.game.find((gm) => {
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      gameFound.playerOutGame(client);
      gameFound.stopGame();
    }
  }

  @SubscribeMessage('resize')
  hundle_responsiveGame(client: Socket, payload: any) {
    GameVariable._canvas_Width = payload.cWidth;
    GameVariable._canvas_Height = payload.cHeight;
    GameVariable._paddle_Height = GameVariable._canvas_Height / 6;
    GameVariable._right_Paddle_X =
      GameVariable._canvas_Width - GameVariable._paddle_Width;
  }

  @SubscribeMessage('upPaddle')
  hundle_up_paddle(client: Socket, payload: string) {
    let gameFound = this.game.find((gm) => {
      console.log(gm);
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      let player: Player = gameFound.get_GamePlayer(client);
      if (payload === 'down') {
        player.getPaddle().up('down');
      } else if (payload === 'up') {
        player.getPaddle().up('up');
      }
    }
  }

  @SubscribeMessage('downPaddle')
  hundle_down_paddle(client: Socket, payload: string) {
    let gameFound = this.game.find((gm) => {
      console.log(gm);
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      let player = gameFound.get_GamePlayer(client);
      if (payload === 'down') player.getPaddle().down('down');
      else if (payload === 'up') player.getPaddle().down('up');
    }
  }

  @SubscribeMessage('join_match')
  hundle_join_match(client: Socket, payload: any) {
    this.logger.log('Join Match ' + `${client.id} `);
    //NOTE - Check If the same client not add in Set of socket
    if (this.socketArr.has(client)) return;
    //NOTE - Add Client Socket In Set
    this.socketArr.add(client);
    //NOTE - Check if Set Of Socket (i means player) to stock is 2
    if (this.socketArr.size > 1) {
      const it = this.socketArr.values();
      this.playerOne = new Player(it.next().value, true);
      this.playerTwo = new Player(it.next().value, false);
      this.socketArr.clear();
      //NOTE - Create new instance of game and game is start in constructor
      const newGame = new Game(this.playerOne, this.playerTwo);
      this.game.push(newGame);
    }
  }
}