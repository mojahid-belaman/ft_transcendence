import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { getConnection, Repository } from 'typeorm';
import { AcceptFriendship, CreateFriendshipsDto } from './dto/create-friendships.dto';
import { Friendships, FriendshipStatus, noneUser } from './entity/friendships.entity';

export let onlineFriends: { id: string, sockets: Socket[] }[] = [];

@Injectable()
export class FriendshipsService {
    constructor(
        @InjectRepository(Friendships)
        private friendshipsRepository: Repository<Friendships>
    ) {}


    async getAllFriendships(userID: string, status: FriendshipStatus): Promise<any[]> {
        return await this.friendshipsRepository.query(`
            SELECT DISTINCT 
                id,
                username,
                login,
                "lastConnected",
                avatar
            FROM USERS
            WHERE id::text IN (
                SELECT
                    "firstId"::text as "firstId"
                FROM friendships
                WHERE "secondId"::text = '${userID}' AND status = '${status}'
                )
            OR id::text IN (
                SELECT
                    "secondId"::text as "secondId"
                FROM friendships
                WHERE "firstId"::text = '${userID}' AND status = '${status}')
            `).then(users => {
                if (users && users.length !== 0)
                    return users.map(user => ({...user, isOnline: onlineFriends.findIndex(online => online.id === user.id) !== -1}));
                return [];
            });
    }


    async getBlockedFriendships(userID: string): Promise<any[]> {
        return await this.friendshipsRepository.query(`
        SELECT DISTINCT 
            users.id,
            users.username,
            users.login,
            users."lastConnected",
            users.avatar,
            friendships."blockedBy"::text = '${userID}' AS "isBlocking"
        FROM users
        JOIN friendships
        ON ("firstId"::text = users.id::text OR "secondId"::text = users.id::text)
        WHERE users.id::text IN (
            SELECT
                "firstId"::text as "firstId"
            FROM friendships
            WHERE "secondId"::text = '${userID}' AND status = '${FriendshipStatus.BLOCKED}'
            )
        OR users.id::text IN (
            SELECT
                "secondId"::text as "secondId"
            FROM friendships
            WHERE "firstId"::text = '${userID}' AND status = '${FriendshipStatus.BLOCKED}')
            `);
    }

    async getPendingFriendships(userID: string) {
        return await this.friendshipsRepository.query(`
            SELECT DISTINCT 
                id,
                username,
                login,
                "lastConnected",
                avatar
            FROM USERS
            WHERE id::text IN (
            SELECT
                "firstId"::text as "firstId"
            FROM friendships
            WHERE "secondId"::text = '${userID}' AND status = '${FriendshipStatus.PENDING}')
        `);
    }

    async addFriend(createFriendship: CreateFriendshipsDto) {
        return await this.friendshipsRepository.find({
            where: [
                {firstId: createFriendship.firstId, secondId: createFriendship.secondId},
                {firstId: createFriendship.secondId, secondId: createFriendship.firstId}
            ]
        }).then(async (friendship) => {
            if (friendship.length !== 0)
                    throw new ForbiddenException("Friendship already exists");
            return await this.friendshipsRepository.save(createFriendship)
            .then(async (newPendingFriend) => {
                
                return await this.friendshipsRepository.query(`
                SELECT DISTINCT 
                    id,
                    username,
                    "lastConnected",
                    avatar
                FROM USERS
                WHERE id::text IN (
                SELECT
                    "firstId"::text as "firstId"
                FROM friendships
                WHERE friendships.id::text = '${newPendingFriend.id}')
            `);
            })
        })
    }

    async acceptFriend(acceptFriend: AcceptFriendship) {
        return  await this.friendshipsRepository.findOne({
            where: {firstId: acceptFriend.firstId, secondId: acceptFriend.secondId, status: FriendshipStatus.PENDING}
        })
        .then(friendship => {
            
            if (!friendship)
                return undefined;
            return this.friendshipsRepository.save({...friendship, status: FriendshipStatus.ACCEPTED})
        })
    }

    
    async setFriendshipStatus(userId: string, blockedUserId: string, friendshipStatus: FriendshipStatus) {
        return await this.friendshipsRepository.findOne({
            where: [
                {firstId: userId, secondId: blockedUserId},
                {firstId: blockedUserId, secondId: userId}
            ]
        }).then(async friendship => {
            if ((friendship.blockedBy === noneUser) || (friendship.blockedBy === userId)) {
                const blockedBy =  friendshipStatus === FriendshipStatus.BLOCKED ? userId : noneUser;
                return await this.friendshipsRepository.save({...friendship, status: friendshipStatus, blockedBy: blockedBy})
                    .then(async () => {
                        return await this.friendshipsRepository.query(`
                        SELECT 
                        username,
                        login,
                        "lastConnected",
                        avatar
                        FROM USERS WHERE id::text = '${blockedUserId}'`);
                    })
            }
            else
                return false;
        })
    }
    
    async removeFriendship (firstId: string, secondId: string) {
        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Friendships)
        .where(`("firstId"::text = :firstId AND "secondId"::text = :secondId) OR ("firstId"::text = :secondId AND "secondId"::text = :firstId)`, { firstId: firstId, secondId: secondId})
        .execute();
        
    }
    /* ****************************** ONLINE SETTERS AND GETTERS ******************** */
    
    checkIfUserOnline(userId: string) {
        return onlineFriends.find(user => user.id === userId);
    }

    checkIfUserOnlineWithout(userId: string) {
        return onlineFriends.find(user => user.id === userId).sockets;
    }

    getOnlineFriends(userId: string) {
        return this.getAllFriendships(userId, FriendshipStatus.ACCEPTED)
        .then(users => users.filter(user => {
            return user.isOnline
        }));
    }

    setOnlineStatus(userId: string, @ConnectedSocket() client: Socket) {
        const onlineUser = onlineFriends.findIndex(friend => friend.id === userId)
        if (onlineUser === -1)
        {
            onlineFriends.push({id: userId, sockets: [client]});
            this.getOnlineFriends(userId)
            .then(users => {
                if (users && users.length !== 0)
                    users.forEach(user => {
                        const userSockets = onlineFriends.find(tmp => tmp.id === user.id);
                        if (userSockets)
                            this.friendshipsRepository.query(`
                            SELECT DISTINCT 
                                id,
                                username,
                                "lastConnected",
                                avatar
                            FROM USERS
                            WHERE id::text = '${userId}'`)
                            .then(user => {
                                if(user && user.length === 1)
                                    userSockets.sockets.forEach(socket => socket.emit("addedNewOnlineFriend", {...user}))
                            })
                        })
            })
        }
        else {
            const currentSocket = onlineFriends[onlineUser].sockets.findIndex(socket => socket.id === client.id)
            if (currentSocket === -1)
                onlineFriends[onlineUser].sockets.push(client);
        }
    }

    setOffLineStatus(userId: string, clientId: string) {
        onlineFriends.forEach(onlineUser => {
            if(onlineUser.id === userId) {
                onlineUser.sockets = onlineUser.sockets.filter(socket => socket.id !== clientId)
                if (onlineUser.sockets.length === 0)
                    onlineFriends = onlineFriends.filter(user => user.id !== userId);
            }
        })
        // onlineFriends = onlineFriends.filter(user => user.id !== userId);
    }

    async getFriendshipStatus(userId: string, friendId: string) {
        return await this.friendshipsRepository.findOne({
            where: [
                {firstId: userId, secondId: friendId},
                {firstId: friendId, secondId: userId}
            ]
        })
    }

    /* ****************************************************************************** */
}
