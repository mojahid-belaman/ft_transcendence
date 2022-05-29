import { WebSocketGateway } from '@nestjs/websockets';
import { FriendshipsService } from './friendships.service';

@WebSocketGateway()
export class FriendshipsGateway {
  constructor(private readonly friendshipsService: FriendshipsService) {}
  
}
