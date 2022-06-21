import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateFriendshipsDto } from './dto/create-friendships.dto';
import { Friendships } from './entity/friendships.entity';

export let onlineFriends: string[] = [];

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
        SELECT 
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

    getOnlineFriends(userId: string) {
        return this.getAllFriendships(userId)
        .then(users => users.filter(user => onlineFriends.indexOf(user.id) !== -1));
    }

    setOnlineStatus(userId: string) {
        onlineFriends.push(userId);
    }

    setOffLineStatus(userId: string) {
        onlineFriends = onlineFriends.filter(user => user !== userId);
    }
}
