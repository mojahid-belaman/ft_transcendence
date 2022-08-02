import { Body, ForbiddenException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BlockedFriendshipsDtoBody } from './dto/blocked-friendship.dto';
import { CreateFriendshipsDtoBody } from './dto/create-friendships.dto';
import { FriendshipStatus } from './entity/friendships.entity';
import { FriendshipsService, onlineFriends } from './friendships.service';

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

    /* ************* FRIENDS GETTERS *********** */
  @SubscribeMessage("allFriends")
  async getAllFriends(@MessageBody() body, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {

      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.getAllFriendships(user.id, FriendshipStatus.ACCEPTED)
        .then(users => client.emit("getAllFriends", users.map(user => ({...user, isOnline: this.friendshipsService.checkIfUserOnline(user.id) !== undefined}))));
      }
    }
  }

  @SubscribeMessage("onlineFriends")
  async getOnlineFriends(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
                this.friendshipsService.getOnlineFriends(user.id)
        .then(onlineUsers => {          
          if (onlineUsers.length !== 0)
            client.emit("getOnlineFriends", onlineUsers);
        })
      }
    }
  }

  @SubscribeMessage("pendingFriends")
  async getPendingFriends(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {

      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        this.friendshipsService.getPendingFriendships(user.id)
        .then(pendingFriends => {
          if (pendingFriends) 
            client.emit("pendingFriendsList", pendingFriends);
        })
      }
    }
  }

  @SubscribeMessage("blockedFriends")
  async getBlockedFriends(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {

    if (client.handshake.query && client.handshake.query.token) {

      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        this.friendshipsService.getBlockedFriendships(user.id)
        .then(blockedFriends => {
          if (blockedFriends.length !== 0) {
            const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === user.id)
              onlineUser.sockets.forEach(socket => socket.emit("blockedFriendsList", [...blockedFriends]))
          }
        })
      }
    }
  }

  /* ************* INVITATIONS HANDLERS *************** */

  @SubscribeMessage("addFriend")
  async addFriend(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        this.friendshipsService.addFriend({firstId: user.id, secondId: body.userId, status: FriendshipStatus.PENDING})
        .then(newFriendShip => {
          if (newFriendShip)
            this.server.emit("addedNewPendingFriendship", newFriendShip); // SHOULD CHAAANGE
        })
      }
    }
  }

  @SubscribeMessage("acceptFriend")
  async acceptFriend(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        this.friendshipsService.acceptFriend({firstId: body.userId, secondId: user.id})
        .then(newFriendShip => {
          if(newFriendShip) {
            const clientSockets = onlineFriends.find(online => online.id == user.id);
            clientSockets.sockets.forEach(socket => socket.emit("RemovependingFriends", {...newFriendShip}));
            const newFriend = this.friendshipsService.checkIfUserOnline(body.userId);
            if (newFriend && newFriend.sockets.length !== 0) {
              newFriend.sockets.forEach(socket => socket.emit("addedNewFriendship", {...user, isOnline: true}));
            }
          }
        })
      }
    }
  }

  @SubscribeMessage("refuseFriend")
  async refuseFriend(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        const clientSockets = this.friendshipsService.checkIfUserOnline(user.id);
        clientSockets.sockets.forEach(socket => socket.emit("rejectFriendship", {id: body.userId}))
      }
    }
  }

  /* ********************************* REMOVE FRIENDSHIP *********************************************************** */

  @SubscribeMessage("RemoveFriendship")
  async removeFriendShip(@MessageBody() body, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.removeFriendship(user.id, body.friendId)
        .then(() => {
          const clients = this.friendshipsService.checkIfUserOnline(user.id);
          clients.sockets.forEach(clientSocket => clientSocket.emit("RemoveFriend", {id: body.friendId})) 
          const friend = this.friendshipsService.checkIfUserOnline(body.friendId);
          if (friend)
            friend.sockets.forEach(socket => socket.emit("RemoveFriend", {id: user.id}))
        })
      }
    }
  }

  /* **************************** BLOCK HANDLERS ************************ */

  @SubscribeMessage("blockFriend")
  async setBlockedStatus (@MessageBody() body: BlockedFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.setFriendshipStatus(user.id, body.blockedUserId, FriendshipStatus.BLOCKED)
        .then(friendship => {
          if (friendship) {
            const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === user.id)
            onlineUser.sockets.forEach(socket => socket.emit("RemoveFriend", {id: body.blockedUserId}))
          }
        })
      }
    }
  }

  @SubscribeMessage("unblockFriend")
  async setUnblockedStatus (@MessageBody() body: BlockedFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.setFriendshipStatus(user.id, body.blockedUserId, FriendshipStatus.ACCEPTED)
        .then(friendship => {
          if (friendship) {
            const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === user.id)
            onlineUser.sockets.forEach(socket => socket.emit("RemoveBlockedFriend", {id: body.blockedUserId}))
          }
        })
      }
    }
  }

  @SubscribeMessage("disconnect")
  disconnectHandler() {

  }
}