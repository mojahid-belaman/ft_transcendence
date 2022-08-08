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
  ) { }

  /* ************* FRIENDS GETTERS *********** */
  @SubscribeMessage("allFriends")
  async getAllFriends(@MessageBody() body, @ConnectedSocket() client: Socket) {
    if (client.handshake.query && client.handshake.query.token) {

      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.getAllFriendships(user.userId, FriendshipStatus.ACCEPTED)
          .then(users => {
            client.emit("getAllFriends", users.map(user =>
            ({ ...user, isOnline: this.friendshipsService.checkIfUserOnline(user.userId) !== undefined }
            )))
          });
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
        this.friendshipsService.getOnlineFriends(user.userId)
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
        //console.log(user.userId);
        this.friendshipsService.getPendingFriendships(user.userId)
          .then(pendingFriends => {
            //console.log("getting pending friends => ", pendingFriends);
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
        this.friendshipsService.getBlockedFriendships(user.userId)
          .then(blockedFriends => {
            if (blockedFriends.length !== 0) {
              const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === user.userId)
              onlineUser.sockets.forEach(socket => socket.emit("blockedFriendsList", [...blockedFriends]))
            }
          })
      }
    }
  }

  /* ******************************** INVITATIONS HANDLERS *********************************** */

  @SubscribeMessage("addFriend")
  async addFriend(@MessageBody() body: CreateFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      //console.log(client.handshake.query.token);
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        //console.log("AddFriend => ", user);
        this.friendshipsService.addFriend({ firstId: user.userId, secondId: body.userId, status: FriendshipStatus.PENDING })
          .then(newFriendShip => {
            if (newFriendShip) {
              //console.log(onlineFriends);
              const clientSockets = onlineFriends.find(online => online.id == body.userId);
              if (clientSockets)
                clientSockets.sockets.forEach(socket => socket.emit("addedNewPendingFriendship", { ...newFriendShip }));
            }
            // this.server.emit("addedNewPendingFriendship", newFriendShip); // SHOULD CHAAANGE
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
        this.friendshipsService.acceptFriend({ firstId: body.userId, secondId: user.userId })
          .then(newFriendShip => {
            //console.log("newFriendShip => ", newFriendShip);
            if (newFriendShip) {
              const clientSockets = onlineFriends.find(online => online.id == user.userId);
              //console.log(clientSockets);
              if (clientSockets) {
                clientSockets.sockets.forEach(socket => socket.emit("RemovependingFriends", { ...newFriendShip }));
                const newFriend = this.friendshipsService.checkIfUserOnline(body.userId);
                if (newFriend && newFriend.sockets.length !== 0) {
                  newFriend.sockets.forEach(socket => socket.emit("addedNewFriendship", { ...user, isOnline: true }));
                }
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
        const clientSockets = this.friendshipsService.checkIfUserOnline(user.userId);
        clientSockets.sockets.forEach(socket => socket.emit("rejectFriendship", { id: body.userId }))
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
        await this.friendshipsService.removeFriendship(user.userId, body.friendId)
          .then(() => {
            const clients = this.friendshipsService.checkIfUserOnline(user.userId);
            if (clients) {
              //console.log("clients of RemoveFriends => ", clients);
              clients.sockets.forEach(clientSocket => clientSocket.emit("RemoveFriend", { id: body.friendId, removed: false, message: "You removed this friend" }))
              const friend = this.friendshipsService.checkIfUserOnline(body.friendId);
              if (friend)
                friend.sockets.forEach(socket => socket.emit("RemoveFriend", { id: user.id, removed: true, message: "You've been removed" }))
            }
          })
      }
    }
  }

  /* **************************** BLOCK HANDLERS ************************ */

  @SubscribeMessage("blockFriend")
  async setBlockedStatus(@MessageBody() body: BlockedFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.setFriendshipStatus(user.userId, body.blockedUserId, FriendshipStatus.BLOCKED)
          .then(friendship => {
            if (friendship) {
              const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === user.userId)
              onlineUser.sockets.forEach(socket => socket.emit("RemoveFriend", { id: body.blockedUserId, blocked: false, message: "You blocked this friend" }))
              const friend = this.friendshipsService.checkIfUserOnline(body.blockedUserId);
              if (friend)
                friend.sockets.forEach(socket => socket.emit("RemoveFriend", { id: user.id, blocked: true, message: "You've been blocked" }))
            }
          })
      }
    }
  }

  @SubscribeMessage("unblockFriend")
  async setUnblockedStatus(@MessageBody() body: BlockedFriendshipsDtoBody, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        await this.friendshipsService.setFriendshipStatus(user.userId, body.blockedUserId, FriendshipStatus.ACCEPTED)
          .then(friendship => {
            if (friendship) {
              const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === user.userId)
              onlineUser.sockets.forEach(socket => socket.emit("RemoveBlockedFriend", { id: body.blockedUserId }))
              const blockedFriendAgents = onlineFriends.find(onlineUser => onlineUser.id === body.blockedUserId)
              blockedFriendAgents.sockets.forEach(socket => socket.emit("RemoveBlockedFriend", { id: user.userId }))
            }
          })
      }
    }
  }

  @SubscribeMessage("inviteToGame")
  async inviteToGame(@MessageBody() body, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        const onlineUser = onlineFriends.find(onlineUser => onlineUser.id === body.userId)
        console.log("onlineUser : inviteToGame => ",body);
        onlineUser?.sockets.forEach(socket => socket.emit("InviteToGameSent", { id: user.userId, room: { 
          sender: user.userId,
          receiver: body.userId
        } }))
      }
    }
  }

  @SubscribeMessage("AcceptGameInvite")
  async AcceptGameInvite(@MessageBody() body, @ConnectedSocket() client) {
    if (client.handshake.query && client.handshake.query.token) {
      const user: any = await this.jwtService.verify(String(client.handshake.query.token), {
        secret: process.env.JWT_SECRET
      });
      if (user) {
        console.log("accept =>", body);
        const senderSockets = onlineFriends.find(onlineUser => onlineUser.id === body.sender)
        const receiverSockets = onlineFriends.find(onlineUser => onlineUser.id === body.receiver)
        senderSockets?.sockets.forEach(socket => socket.emit("startGame", { room: {...body} }))
        receiverSockets?.sockets.forEach(socket => socket.emit("startGame", { room: {...body}}))
        // setTimeout(() => {
        //   receiverSockets.sockets[0].emit("startGame", { room: {...body} });
        // }, 200);
        // senderSockets.sockets[0].emit("startGame", { room: {...body} });
      }
    }
  }

  // inviteToGame

}