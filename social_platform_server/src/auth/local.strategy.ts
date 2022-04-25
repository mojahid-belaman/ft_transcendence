import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport"
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }
    
    async validate(email: string, password: string): Promise<any> {
        // console.log(email);
        
        const user = await this.authService.validateUser(email, password);
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