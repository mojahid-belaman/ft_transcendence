import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { IntraAuthService } from './services/IntraAuth.service';

@Controller('oauth')
export class IntraAuthController {
  constructor(
    private readonly intraAuthService: IntraAuthService,
    private readonly authService: AuthService,
  ) { }

  @Get()
  @UseGuards(IntraAuthGuard)
  async login(@Req() req, @Res({ passthrough: true }) res) {
    if (req.user) {
      const userExist = await this.intraAuthService.intraLogin(req.user);
      if (userExist.isTwoFactorAuthEnabled) {
        const temp_token = await this.authService.tfaToken({...req.user, id: userExist.id});
        res.cookie('2fa_token', temp_token);
        return res.redirect(`${process.env.FRONT_END_URI}/twoFactorAuth`);
      }
      const accesToken = await this.authService.login({...req.user, id: userExist.id});
      res.cookie('access_token', accesToken);
      if(userExist.isFirstTime)
        return res.redirect(`${process.env.FRONT_END_URI}/settings`);
      return res.redirect(`${process.env.FRONT_END_URI}/home`);
    }

  }
}
