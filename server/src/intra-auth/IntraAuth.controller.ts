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
    const userExist = await this.intraAuthService.intraLogin(req);
    const accesToken = await this.authService.login(req.user);
    res.cookie('access_token', accesToken);
    // if (!userExist) return res.redirect(`${process.env.FRONT_END_URI}/`);
    // return res.redirect(`${process.env.FRONT_END_URI}/welcome`);
    return res.redirect(`${process.env.FRONT_END_URI}/`);
  }
}