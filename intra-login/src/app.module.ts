import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { fourtyTwoStrategy } from './Strategies/intra.strategy';
import { IntraAuthGuard } from './Guards/auth.guard';
import { HttpModule } from '@nestjs/common';
import { UserDataService } from './Services/userData.service';

@Module({
	imports: [HttpModule],
	controllers: [AppController],
	providers: [AppService, fourtyTwoStrategy, IntraAuthGuard, UserDataService],
})
export class AppModule {}
