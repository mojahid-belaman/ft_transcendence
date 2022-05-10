import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
      ) {}

    async validateUser (username: string, password: string): Promise<any> {
        return this.userService.findOne({ username: username})
        .then(async (user) => {
            if (!user)
                return {
                    errorMessage: "Email not found"
                };
            console.log(user)
            if (user &&!(await bcrypt.compare(password, user.password)))
                return null;
            return user;
        });
    }

    async login(user: any) {
        const payload = { ...user };
        delete user.id
        return {
          access_token: this.jwtService.sign(payload),
          ...user
        };
    }

    async authLogin(user: any) {
        const payload = { ...user };
        delete user.id
        delete user.password
        if (payload.role != 'admin')
            throw new ForbiddenException();
        return {
          access_token: this.jwtService.sign(payload),
          ...user
        };
    }
}
