import { Controller, Get, Param} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private useRepo: UsersService) {}

    @Get()
    async findAll() {
        return await this.useRepo.findAll();
    }

    @Get(":id")
    async findById(@Param() id: string) {
        return await this.useRepo.findById(id);
    }
}
