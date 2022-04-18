import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private useRepo: UsersService) {}

    @Get()
    async findAll() {
        return await this.useRepo.findAll();
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return await this.useRepo.findById(id);
    }
}
