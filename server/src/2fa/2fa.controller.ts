import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthService } from './2fa.service';
import * as QRCode from 'qrcode';
import { Response } from 'express';
import { twoFA } from './interface/2fa.interface';

@Controller('twofactorAuth')
export class TwoFactorAuthController {
  constructor(
    private twoFactorAuthService: TwoFactorAuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/register')
  async register(@Req() req, @Res() res: Response) {
    const user = await this.userService.getUserBylogin(req.user['login']);
    const { otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
        user,
      );
    await this.twoFactorAuthService.generateQrCodeDataURL(otpauthUrl).then((result) =>
      res.send(JSON.stringify({ qrcode: result })),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/turnOn')
  async trunOn2FA(@Body() twoFACode: twoFA, @Req() req) {
    const user = await this.userService.getUserBylogin(req.user['login']);
    const isValidCode = this.twoFactorAuthService.is2FactorAuthCodeValid(
      twoFACode.code,
      user,
      );
      
      if (!isValidCode)
      throw new UnauthorizedException('Invalid authentication code');
      await this.userService.turnOnTwoFactorAuthentication(user['login']);
      return true;
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('turnoff')
    async turnOff2FA(@Req() req) {
      const user = await this.userService.getUserBylogin(req.user['login']);
    if (!user.isTwoFactorAuthenticated)
      throw new BadRequestException('2-Factor-Authentication is not enabled!');
    this.userService.unSet2FASecret(user.login);
  }

  @UseGuards(JwtAuthGuard)
  @Post('turnAuthOn')
  async turnAuthOn(@Req() req, @Body() body) {
    return await this.userService.EnableDisable2FA(req.user['login'], body.is2FA);
  }
}
