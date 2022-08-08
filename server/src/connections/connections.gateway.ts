import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
  cors: {
    origin: process.env.FRONT_END_URI
  }
})
export class ConnectionsGateway {
  @Inject()
  private jwtService: JwtService;
}