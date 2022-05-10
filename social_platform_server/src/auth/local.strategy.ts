import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport"
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'username' });
    }
    
    async validate(username: string, password: string): Promise<any> {
        
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new HttpException({
                errorStatus: HttpStatus.UNAUTHORIZED,
                errorMessage: 'Password invalid'
              }, HttpStatus.UNAUTHORIZED);
        }
        if (user.hasOwnProperty("errorMessage"))
        throw new HttpException({
            errorStatus: HttpStatus.UNAUTHORIZED,
            errorMessage: user.errorMessage
          }, HttpStatus.UNAUTHORIZED);
        return user;
    }
}