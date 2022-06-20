import { WebSocketGateway } from '@nestjs/websockets';
import { FriendshipsService } from './friendships.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FriendshipsGateway {
  constructor(private readonly friendshipsService: FriendshipsService) {}
  
}
