import { Module, RequestMethod } from '@nestjs/common';
import { AppProvidersService } from './app-providers.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';
import { logger } from './logger.middleware';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, AppProvidersService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(logger)
			.exclude({ path: 'cats', method: RequestMethod.ALL })
			.forRoutes(AppController);
	}
}
