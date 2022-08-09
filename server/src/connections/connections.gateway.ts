import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
  namespace: "chat",
  cors: {
    origin: "*"
  }
})
export class ConnectionsGateway {
  @Inject()
  private jwtService: JwtService;
}