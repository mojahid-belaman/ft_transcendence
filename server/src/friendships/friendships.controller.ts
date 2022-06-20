import { Controller, Get } from '@nestjs/common';

@Controller('friendships')
export class FriendshipsController {

    @Get("/getPeople")
    getPeople() {
        
    }
}
