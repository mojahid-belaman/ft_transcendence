import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FriendshipsService } from "./friendships.service";


@Controller("friendships")
export class FriendshipsController {

    constructor (
        private friendshipsService: FriendshipsService
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get("online")
    getAll(@Req() req) {
        return this.friendshipsService.getOnlineFriends(req.user.userId);
    }
}