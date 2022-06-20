import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { FriendshipsService } from './friendships.service';

// const pendingFriends = [];
// const blockedFriends = [];

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class FriendshipsGateway {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @SubscribeMessage("addFriend")
  addFriend() {

  }

  @SubscribeMessage("onlineFriends")
  getOnlineFriends() {

  }

  @SubscribeMessage("setOnlineStatus")
  setOnlineStatus () {

  }

  @SubscribeMessage("setOfflineStatus")
  setOfflineStatus () {

  }
  
}