import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendships } from './entity/friendships.entity';

export const onlineFriends = [];

@Injectable()
export class FriendshipsService {
    constructor(
        @InjectRepository(Friendships)
        private friendshipsRepository: Repository<Friendships>
    ) {}

    getAllPeople() {
        return this.friendshipsRepository.find();
    }

    addFriend() {
        
    }

    getOnlineFriends() {

    }

    setOnlineStatus() {

    }

    setOffLineStatus() {

    }

}
