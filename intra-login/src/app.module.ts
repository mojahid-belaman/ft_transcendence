import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { fourtyTwoStrategy } from './Strategies';
import { IntraAuthGuard } from './Guards/auth.guard';
import { HttpModule } from '@nestjs/common';

@Module({
	imports: [HttpModule],
	controllers: [AppController],
	providers: [AppService, fourtyTwoStrategy, IntraAuthGuard],
})
export class AppModule {}
