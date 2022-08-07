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
  private userArr: any[] = [];

  @WebSocketServer() server: { emit: (arg0: string, arg1: { playing: boolean; first: { username: any; avatar: any; }; second: { username: any; avatar: any; }; }) => void; };

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
        GameGateway.game.splice(GameGateway.game.indexOf(gameFound), 1);
      }
    }
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
    _server.emit('receive_games', JSON.stringify(gameObj, null, 2));
  }

  @SubscribeMessage('join_match')
  hundle_join_match(client: Socket, payload: any) {
    this.logger.log('Join Match ' + `${client.id} `);
    const user: any = payload.user;
    console.log('user => ',payload.user);

    //NOTE - Check If the same client not add in Set of socket
    if (this.socketArr.has(client)) {
      return;
    }

    const findUser = this.userArr.find((u) => {
      return u.id === user.id;
    })
    if (findUser)
      return;
      
    //NOTE - Add Client Socket In Set
    this.socketArr.add(client);

    //NOTE - Add User In Array
    this.userArr.push(user);
    
    //NOTE - Check if Set Of Socket (i means player) to stock is 2
    const itSock = this.socketArr.values();
    const [first, second] = this.userArr;

    if (this.userArr.length > 1) {
      if (first.id === second.id) {
        this.userArr.splice(this.userArr.indexOf(first), 1);
        return;
      }
      this.server.emit('Playing', {
        playing: true,
        first: { username: first.username, avatar: first.avatar },
        second: { username: second.username, avatar: second.avatar },
      });
      this.playerOne = new Player(
        itSock.next().value,
        true,
        first.id,
        first.username,
        first.avatar,
      );
      this.playerTwo = new Player(
        itSock.next().value,
        false,
        second.id,
        second.username,
        second.avatar,
      );

      //NOTE - Create new instance of game and game is start in constructor
      const newGame = new Game(
        this.playerOne,
        this.playerTwo,
        this.gameService,
        this.sendGames,
        this.server,
        GameGateway.game,
      );

      GameGateway.game.push(newGame);
      this.sendGames(this.server);

      this.socketArr.delete(newGame.get_PlayerOne().getSocket());
      this.socketArr.delete(newGame.get_PlayerTwo().getSocket());
      this.userArr.splice(0, this.userArr.length);

      console.log('Game length: ' + GameGateway.game.length);
      console.log('Socket size: ' + this.socketArr.size);
      console.log('user size: ' + this.userArr.length);
    }
  }
  @SubscribeMessage('send_games')
  hundle_receiveGame(client: Socket, payload: any) {
    if (GameGateway.game.length !== 0) {
      const gameObj = { games: GameGateway.game.map((g) => g.getSubGame()) };
      // console.log(gameObj);
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
