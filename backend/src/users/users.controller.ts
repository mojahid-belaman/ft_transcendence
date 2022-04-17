import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {

    constructor(@InjectRepository(Users) private useRepo: Repository<Users>) {}

    @Get(':id')
    async findById(@Param() id: string) {
        return await this.useRepo.findOne({id});
    }
}
