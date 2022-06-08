import { Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GameVariable } from './Classes/constant';
import { Game } from './Classes/game';
import { gameSate } from './Classes/gameState';
import { Player } from './Classes/player';
import { GameService } from './game.service';

@WebSocketGateway(5001, { cors: { origin: '*' } })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('GameGateway');
  //NOTE - Declare Objects Of Players
  private playerOne: Player;
  private playerTwo: Player;
  //NOTE - Declare Array Of Game and every Game has two Players
  static game: Game[] = [];
  //NOTE - Declare Array (Set) of Players (client.Id not repeat)
  private socketArr: Set<Socket> = new Set<Socket>();
  private userArrDef: any[] = [];
  private userArrObs: any[] = [];

  @WebSocketServer() server;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private gameService: GameService;

  afterInit(server: any) {
    this.logger.log('Initial');
  }

  handleConnection(client: Socket, ...args: any[]) {
    /* 
    if the user has watcher stat: emit "send_games" with GameGateway.game array to be rendered in the frontend
     */
    this.logger.log('Connect Success ' + `${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected ' + `${client.id}`);
    let gameFound = GameGateway.game.find((gm) => {
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      if (gameFound.gameStateFunc() === gameSate.PLAY) {
        gameFound.playerOutGame(client);
        gameFound.stopGame();
      }
    }
    GameGateway.game.splice(GameGateway.game.indexOf(gameFound), 1);
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
    let gameFound = GameGateway.game.find((gm) => {
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
    let gameFound = GameGateway.game.find((gm) => {
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

  private sendGames(_server: any) {
    const gameObj = { games: GameGateway.game.map((g) => g.getSubGame()) };
    // console.log(gameObj);
    _server.emit('receive_games', JSON.stringify(gameObj, null, 2));
  }

  @SubscribeMessage('join_match')
  hundle_join_match(client: Socket, payload: any) {
    this.logger.log('Join Match ' + `${client.id} `);

    const user: any = this.jwtService.decode(payload.access_token);

    //NOTE - Check If the same client not add in Set of socket
    if (this.socketArr.has(client)) {
      return;
    }

    //NOTE - Add Client Socket In Set
    this.socketArr.add(client);

    if (payload.type === 'default') {
      //NOTE - Add User In Array
      this.userArrDef.push(user);
      console.log(this.userArrDef);

      //NOTE - Check if Set Of Socket (i means player) to stock is 2
      if (this.userArrDef.length > 1) {
        const itSock = this.socketArr.values();
        const [first, second] = this.userArrDef;

        if (first.id === second.id) {
          this.userArrDef.splice(this.userArrDef.indexOf(first), 1);
          return;
        }

        this.playerOne = new Player(
          itSock.next().value,
          true,
          first.id,
          first.username,
        );
        this.playerTwo = new Player(
          itSock.next().value,
          false,
          second.id,
          second.username,
        );

        //NOTE - Create new instance of game and game is start in constructor
        const newGame = new Game(
          this.playerOne,
          this.playerTwo,
          this.gameService,
          payload.type,
          this.sendGames,
          this.server,
        );

        GameGateway.game.push(newGame);
        this.sendGames(this.server);

        this.socketArr.delete(newGame.get_PlayerOne().getSocket());
        this.socketArr.delete(newGame.get_PlayerTwo().getSocket());
        this.userArrDef.splice(0, this.userArrDef.length);

        console.log('Game length: ' + GameGateway.game.length);
        console.log('Socket size: ' + this.socketArr.size);
        console.log('user size: ' + this.userArrDef.length);
      }
    }
    // else if (payload.type === 'obstacle') {
    //   //NOTE - Add User In Array
    //   this.userArrObs.push(user);

    //   //NOTE - Check if Set Of Socket (i means player) to stock is 2
    //   if (this.userArrObs.length > 1) {
    //     const itSock = this.socketArr.values();
    //     const [first, second] = this.userArrObs;

    //     if (first.id === second.id) {
    //       this.userArrObs.splice(this.userArrObs.indexOf(first), 1);
    //       return;
    //     }

    //     this.playerOne = new Player(
    //       itSock.next().value,
    //       true,
    //       first.id,
    //       first.username,
    //     );
    //     this.playerTwo = new Player(
    //       itSock.next().value,
    //       false,
    //       second.id,
    //       second.username,
    //     );

    //     //NOTE - Create new instance of game and game is start in constructor
    //     const newGame = new Game(
    //       this.playerOne,
    //       this.playerTwo,
    //       GameGateway.gameService,
    //       payload.type,
    //     );

    //     GameGateway.game.push(newGame);
    //     this.socketArr.delete(newGame.get_PlayerOne().getSocket());
    //     this.socketArr.delete(newGame.get_PlayerTwo().getSocket());
    //     this.userArrObs.splice(0, this.userArrObs.length);

    //     console.log('Game length: ' + GameGateway.game.length);
    //     console.log('Socket size: ' + this.socketArr.size);
    //     console.log('user size: ' + this.userArrObs.length);
    //   }
    // }
  }
  @SubscribeMessage('send_games')
  hundle_receiveGame(client: Socket, payload: any) {
    if (GameGateway.game.length !== 0) {
      const gameObj = { games: GameGateway.game.map((g) => g.getSubGame()) };
      console.log(gameObj);
      client.emit('receive_games', JSON.stringify(gameObj, null, 2));
    }
  }
  @SubscribeMessage('watchers')
  hundel_watchers(client: Socket, payload: any) {
    // console.log(payload);
    const gameFound = GameGateway.game.find((gm) => {
      return gm.getId() === payload.gameId;
    });

    if (gameFound) gameFound.addWatcher(client);
  }
}
