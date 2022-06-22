import { ForbiddenException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { jwtConstants } from 'src/auth/constants';
import { BlockedFriendshipsDtoBody } from './dto/blocked-friendship.dto';
import { CreateFriendshipsDtoBody } from './dto/create-friendships.dto';
import { FriendshipStatus } from './entity/friendships.entity';
import { FriendshipsService } from './friendships.service';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class FriendshipsGateway {

  @Inject()
  private jwtService: JwtService;

  @WebSocketServer() server;

  constructor(
    private readonly friendshipsService: FriendshipsService,
    ) {}

  @SubscribeMessage("allFriends")  
  async getAllFriends(@MessageBody() body, @ConnectedSocket() client: Socket) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        await this.friendshipsService.getAllFriendships(user.id)
        .then(users => client.emit("getAllFriends", users));
      }
    }
   
  }

  @SubscribeMessage("addFriend")
  async addFriend(@MessageBody() body: CreateFriendshipsDtoBody) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        const newFriendShip = this.friendshipsService.addFriend({firstId: user.id, secondId: body.userId, status: FriendshipStatus.PENDING});
        if (newFriendShip)
          this.server.emit("addedNewPendingFriendship", newFriendShip);
      }
    }
  }

  @SubscribeMessage("acceptFriend")
  async acceptFriend(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        this.friendshipsService.addFriend({firstId: user.id, secondId: body.userId, status: FriendshipStatus.PENDING})
        .then(newFriendShip => {
          this.server.emit("addedNewFriendship", newFriendShip);
          if (this.friendshipsService.checkIfUserOnline(user.id))
            client.emit("addOnlineFriends", {...user});
        })
      }
    }
  }

  @SubscribeMessage("refuseFriend")
  async refuseFriend(@MessageBody() body: CreateFriendshipsDtoBody) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user)
        this.server.emit("rejectFriendship", {firstId: body.userId, secondId: user.id});
    }
  }

  @SubscribeMessage("onlineFriends")
  async getOnlineFriends(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        const onlineFriends = this.friendshipsService.getOnlineFriends(user.id);
        if (onlineFriends)
          client.emit("onlineFriendsList", onlineFriends);
      }
    }
  }

  @SubscribeMessage("setOnlineStatus")
  async setOnlineStatus (@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        this.friendshipsService.setOnlineStatus(user.id, client)
        delete user.password;
        delete user.lastConnected;
        this.server.emit("addedNewOnlineFriendsList", {...user});
      }
    }
  }

  @SubscribeMessage("setOfflineStatus")
  async setOfflineStatus (@MessageBody() body: CreateFriendshipsDtoBody) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        this.friendshipsService.setOffLineStatus(user.id)
        this.server.emit("removeOneOnlineFriendsList", user.id);
      }
    }
  }

  @SubscribeMessage("blockFriend")
  async setBlockedStatus (@MessageBody() body: BlockedFriendshipsDtoBody) {
    if (body.hasOwnProperty('token')) {
      const user: any = await this.jwtService.verify(body.token, {
        secret: jwtConstants.secret
      });
      if (user) {
        await this.friendshipsService.setBlockedFriendshipStatus(user.id, body.blockedUserId)
        .then(friendship => {
          this.server.emit("AddToBlockedFriendsList", {...friendship});
        })
      }
    }
  }
}