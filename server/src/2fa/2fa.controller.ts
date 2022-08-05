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
import { JwtTwoFactorGuard } from './Guards/twofactorAuthJwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/auth/dto';
import { UpdateUserDto } from 'src/users/dto/users.dto';

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
    await this.twoFactorAuthService.generateQrCodeDataURL(otpauthUrl).then((result) =>
      res.send(JSON.stringify({ qrcode: result })),
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('turn-on')
  async turnon(@Body() twoFACode: twoFA, @Req() req) {
    const user = await this.userService.getUserBylogin(req.user['login']);
    const isValidCode = this.twoFactorAuthService.is2FactorAuthCodeValid(
      twoFACode.code,
      user,
      );
      if (!isValidCode)
        return false;
      await this.userService.turnOnTwoFactorAuthentication(user['login']);
      return true;
    }
    
    @Post('authenticate')
    @UseGuards(JwtAuthGuard)
    async authenticate(@Body() twoFACode: twoFA, @Req() req, @Res() res){
      const user = await this.userService.getUserBylogin(req.user['login']);
      const isValidCode = this.twoFactorAuthService.is2FactorAuthCodeValid(
        twoFACode.code,
        user,
        );
      if (!isValidCode)
        throw new UnauthorizedException('Invalid authentication code');
      return res.status(HttpStatus.CREATED).send({
        'access_token': await this.authService.login(user)
      });;
    }

    @UseGuards(JwtAuthGuard)
    @Get('turn-off')
    async turnOff(@Req() req) {
      const user = await this.userService.getUserBylogin(req.user['login']);
    if (!user.isTwoFactorAuthEnabled)
      throw new BadRequestException('2-Factor-Authentication is not enabled!');
    return this.userService.unSet2FASecret(user.login);
  }
}
