import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtTwoFactorGuard extends AuthGuard('local') {}
