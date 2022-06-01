import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversations } from './entity/conversation.entity';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectRepository(Conversations)
        private conversationsRepository: Repository<Conversations>
    ){}

    create(body) {
       return this.conversationsRepository.save(body); 
    }

    getConversations(userId: string) {
        return this.conversationsRepository.query(`
            SELECT * FROM conversations
            WHERE "firstId"::text='${userId}' OR "secondId"::text='${userId}';
        `);
    }

    getSingleConversation(id:string, userId: string) {
        return this.conversationsRepository.query(`
            SELECT * FROM conversations
            WHERE id::text='${id}' AND ("firstId"::text='${userId}' OR "secondId"::text='${userId}');
        `).then(data => {
            if (!data)
                return {};
            return data[0];
        });
    }
}
