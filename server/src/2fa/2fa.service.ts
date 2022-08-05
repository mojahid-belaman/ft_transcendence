import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  constructor(private userService: UsersService) {}
  async generateTwoFactorAuthenticationSecret(user: Users) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      'FT_TRANSCENDANCE',
      secret,
    );

    await this.userService.setTwoFactorAuthenticationSecret(secret, user);
    return {
      secret,
      otpauthUrl,
    };
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return QRCode.toDataURL(otpAuthUrl);
  }

  is2FactorAuthCodeValid(twoFACode: string, user: Users): boolean {
    return authenticator.verify({
      token: twoFACode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }
}
