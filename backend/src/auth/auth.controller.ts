import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    //NOTE - Add Validation
    @Post("register")
    async register(
        @Body("email") email: string, 
        @Body("psw") psw: string) {
            return this.authService.register({email, psw});
    }

    @HttpCode(200)
    @Post("login")
    async login() {
        
    }

}
