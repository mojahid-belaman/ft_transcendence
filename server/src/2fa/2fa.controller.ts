import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { AuthService } from 'src/auth/auth.service';

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(
    private twoFactorAuthService: TwoFactorAuthService,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/generate')
  async generate(@Req() req, @Res() res: Response) {
    const user = await this.userService.getUserBylogin(req.user['login']);
    this.userService.Enable2FA(user);
    const { otpauthUrl } =
    await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
      user,
      );
    const qrCode = await this.twoFactorAuthService.generateQrCodeDataURL(otpauthUrl);
    await this.userService.updateqrCode(user, qrCode);
    res.send(JSON.stringify({ qrcode: qrCode }));
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('turn-on')
  async turnon(@Body() twoFACode: twoFA, @Req() req) {
    const user = await this.userService.getUserById(req.user.userId);
    const isValidCode = this.twoFactorAuthService.is2FactorAuthCodeValid(
      twoFACode.code,
      user,
      );
      if (!isValidCode)
        return new UnauthorizedException();
      await this.userService.turnOnTwoFactorAuthentication(user['login']);
      return true;
    }
    
    @Post('authenticate')
    @UseGuards(JwtAuthGuard)
    async authenticate(@Body() twoFACode: twoFA, @Req() req, @Res() res){
      const user = await this.userService.getUserById(req.user['userId']);
      const isValidCode = this.twoFactorAuthService.is2FactorAuthCodeValid(
        twoFACode.code,
        user,
        );
      if (!isValidCode)
        return new UnauthorizedException('Invalid authentication code');
      return res.status(HttpStatus.CREATED).send({
        'access_token': await this.authService.login(user)
      });;
    }

    @UseGuards(JwtAuthGuard)
    @Get('turn-off')
    async turnOff(@Req() req) {
      const user = await this.userService.getUserBylogin(req.user['login']);
    if (!user.isTwoFactorAuthEnabled)
      return new BadRequestException('2-Factor-Authentication is not enabled!');
    return this.userService.unSet2FASecret(user.login);
  }
}
