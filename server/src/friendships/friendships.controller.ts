import { Controller, Delete, Get, Inject, Param, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/Guards/jwt-auth.guard";
import { FriendshipStatus } from "./entity/friendships.entity";
import { FriendshipsService } from "./friendships.service";


@Controller("friendships")
export class FriendshipsController {

    constructor (
        private friendshipsService: FriendshipsService
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get("online")
    async getAll(@Req() req) {
        return await this.friendshipsService.getOnlineFriends(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("unfriend/:id")
    async unfriendUser (@Req() req, @Param("id") id) {
        return await this.friendshipsService.removeFriendship(req.user.userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put("block/:id")
    async blockUser (@Req() req, @Param("id") id) {
        return await this.friendshipsService.setFriendshipStatus(req.user.userId, id, FriendshipStatus.BLOCKED);
    }

    @UseGuards(JwtAuthGuard)
    @Get("friendshipStatus/:friendId")
    async getFriendship(@Req() req, @Param("friendId") friendId: string) {
        return await this.friendshipsService.getFriendshipStatus(req.user.userId, friendId);
    }
}