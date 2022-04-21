import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FirstMiddleware } from './middlewares/first.middleware';

@Module({
  imports: [
  
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor (private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
     consumer.apply(FirstMiddleware).forRoutes({path: 'auth', method: RequestMethod.GET});
  }
}
