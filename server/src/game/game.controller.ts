import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/Guards/jwt-auth.guard";
import { GameService } from "./game.service";

@Controller("games")
export class GameController {

    constructor(
        private readonly gameService: GameService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get("history")
    async getHistory(@Req() req) {
        return await this.gameService.getHistory(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile_history/:userId")
    async profileHistory(@Param("userId") userId) {
        return await this.gameService.getHistory(userId);
    }


}