import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { IntraAuthService } from './services/IntraAuth.service';

@Controller('oauth')
export class IntraAuthController {
  constructor(
    private readonly intraAuthService: IntraAuthService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(IntraAuthGuard)
  async login(@Req() req, @Res({ passthrough: true }) res) {
    console.log("Req => ", req);
    const userExist = await this.intraAuthService.intraLogin(req);
    // if(userExist && userExist.isTwoFactorAuthEnabled)
    //   res.redirect(`http://localhost:3000/twoFactorAuth`);
    console.log(userExist);
    
    const accesToken = await this.authService.login({...req.user, userId: userExist.id});
    res.cookie('access_token', accesToken);
    // if (!userExist) return res.redirect(`${process.env.FRONT_END_URI}/`);
    // return res.redirect(`${process.env.FRONT_END_URI}/welcome`);
    //TOFIX
    if(!userExist)
      return res.redirect(`http://localhost:3000/home`);
    return res.redirect(`http://localhost:3000/settings`)
  }
}
