import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket } from '@nestjs/websockets';
import { UUIDVersion } from 'class-validator';
import { Socket } from 'socket.io';
import { FindUserResponsDto } from 'src/users/dto/users.dto';
import { Repository } from 'typeorm';
import { CreateFriendshipsDto } from './dto/create-friendships.dto';
import { Friendships, FriendshipStatus } from './entity/friendships.entity';

export let onlineFriends: { id: string, socket: Socket }[] = [];

@Injectable()
export class FriendshipsService {
    constructor(
        @InjectRepository(Friendships)
        private friendshipsRepository: Repository<Friendships>
    ) {}

    /* async getAllFriendships(userID: string) {
        return await this.friendshipsRepository.find({
            where: [
                {firstId: userID},
                {secondId: userID}
            ]
        });
    } */

    async getAllFriendships(userID: string) {
        return await this.friendshipsRepository.query(`
        SELECT DISTINCT 
            id,
            username,
            username42,
            "lastConnected",
            avatar
        FROM USERS WHERE id::text IN (
            SELECT
                "firstId"::text as "firstId"
            FROM friendships
            WHERE "secondId"::text = '$1'
            )
        OR id::text IN (
            SELECT
                "secondId"::text as "secondId"
            FROM friendships
            WHERE "firstId"::text = '$1'
            )
        `, [userID]);
    }

    async addFriend(createFriendship: CreateFriendshipsDto) {
        return await this.friendshipsRepository.save(createFriendship);
    }

    checkIfUserOnline(userId: string) {
        return onlineFriends.findIndex(user => user.id === userId) !== -1;
    }

    getOnlineFriends(userId: string) {
        return this.getAllFriendships(userId)
        .then(users => users.filter(user => onlineFriends.indexOf(user.id) !== -1));
    }

    setOnlineStatus(userId: string, @ConnectedSocket() client: Socket) {
        onlineFriends.push({id: userId, socket: client});
    }

    setOffLineStatus(userId: string) {
        onlineFriends = onlineFriends.filter(user => user.id !== userId);
    }

    async setBlockedFriendshipStatus(userId: string, blockedUserId: string) {
        return await this.friendshipsRepository.findOne({
            where: [
                {firstId: userId, secondId: blockedUserId},
                {firstId: blockedUserId, secondId: userId}
            ]
        }).then(async friendship => {
            return await this.friendshipsRepository.save({...friendship, status: FriendshipStatus.BLOCKED})
            .then(async () => {
             return await this.friendshipsRepository.query(`
                SELECT 
                    username,
                    username42,
                    "lastConnected",
                    avatar
                FROM USERS WHERE id::text = '$1'`, [blockedUserId]);
            })
        })
    }
}
