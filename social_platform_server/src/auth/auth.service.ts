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

    async validateUser (emailVal: string, password: string): Promise<any> {
        const user = await this.userService.findOne({ email: emailVal});
        if (!user)
            return {
                errorMessage: "Email not found"
            };
        if (user &&!(await bcrypt.compare(password, (await user).password)))
            return null;
        return user;
    }

    async login(user: any) {
        // console.log(user)
        const payload = { ...user };
        delete user.id
        // this.notificationService.create("Un nouveau utilisateur a été créé", "", "");
        return {
          access_token: this.jwtService.sign(payload),
          ...user
        };
    }

    async authLogin(user: any) {
        // console.log(user)
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
