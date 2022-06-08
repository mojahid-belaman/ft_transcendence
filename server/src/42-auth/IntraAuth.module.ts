import { HttpModule, Module } from '@nestjs/common';
import { IntraAuthService } from './IntraAuth.service';
import { IntraAuthController } from './IntraAuth.controller';
import { fourtyTwoStrategy } from './Strategies/intra.strategy';
import { IntraAuthGuard } from './Guards/auth.guard';

@Module({
  imports: [HttpModule],
  controllers: [IntraAuthController],
  providers: [IntraAuthService, fourtyTwoStrategy, IntraAuthGuard],
})
export class IntraAuthModule {}
