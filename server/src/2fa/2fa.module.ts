import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'src/users/entity/users.entity';
import { TwoFactorAuthController } from './2fa.controller';
import { TwoFactorAuthService } from './2fa.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from 'src/auth/Strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
      signOptions: { expiresIn: 60 },
    }),
  ],
  controllers: [TwoFactorAuthController],
  providers: [
    TwoFactorAuthService,
    UsersService,
    ConfigService,
    AuthService,
    JwtStrategy,
  ],
})
export class TwofactorauthModule {}
