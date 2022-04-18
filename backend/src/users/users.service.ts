import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private useRepo: Repository<Users>) {}

    async findAll() {
        return await this.useRepo.find();
    }

    async findById(id: string) {
        const data = await this.useRepo.findOne(id);
        if (data)
            return data;
        throw new HttpException(`User with id ${id} not found!`, HttpStatus.NOT_FOUND);
    }
}
